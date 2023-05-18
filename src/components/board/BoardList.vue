<template>
    <main class="wrap_main">
        <div class="container">
            <p class="row h4 fw-bold mt-5" style="width: max-content; margin-right: auto; margin-left: 1%;">
                📰 자유게시판
            </p>
            <hr class="mt-0 border border-dark border-2 opacity-75">
            <table class="table table-sm table caption-top text-center">
                <caption>
                    <div class="input-group input-group-sm mb-3">
                        <select v-model="category" @change="categoryValue($event)" class="form-select rounded-0"
                            style="max-width: 100px;">
                            <option selected name="title" value="title">제목</option>
                            <option name="content" value="content">내용</option>
                        </select>
                        <input v-model="search" type="text" class="form-control focus-danger"
                            aria-label="Text input with dropdown button" style="max-width: 150px;">
                        <button @click="loadPosts()" class="btn btn-outline-secondary" type="button"
                            id="button-addon2">검색</button>
                        <button @click="clickInit()" class="btn btn-outline-secondary ms-3 rounded-0" type="button"
                            id="button-addon2">검색 초기화</button>
                    </div>
                </caption>
                <!-- 데스크탑-->
                <thead v-if="!this.isMobile" class="table-light">
                    <tr>
                        <th scope="col" style="width: 10%;">No</th>
                        <th scope="col" style="width: 60%;">제목</th>
                        <th scope="col" style="width: 10%;">글쓴이</th>
                        <th scope="col" style="width: 10%;">조회</th>
                        <th scope="col" style="width: 10%;">날짜</th>
                    </tr>
                    <tr class="table-success" v-for="notice in notices" :key="notice.bno">
                        <td class="text-muted">{{ notice.bno }}</td>
                        <th style="text-align: left;">
                            <a class="my_hover" style="cursor: pointer;" @click="goToBoardPage(notice.bno)">
                                [공지사항] {{ notice.title }}
                            </a>
                        </th>
                        <td>
                            {{ notice.nickname }}
                        </td>
                        <td>{{ notice.view_count }}</td>
                        <td class="text-muted">{{ formatDate(notice.create_date) }}</td>
                    </tr>
                </thead>
                <tbody v-if="!this.isMobile">
                    <!-- 반복문으로 게시판 출력 -->
                    <tr v-for="post in posts" :key="post.bno">
                        <td class="text-muted">{{ post.bno }}</td>
                        <td style="text-align: left;"><a class="my_hover" style="cursor: pointer;"
                                @click="goToBoardPage(post.bno)">{{ post.title }}</a>
                        </td>
                        <td>
                            <a v-if="this.user_id === 0 && post.nickname != '관리자'" class="my_hover" style="cursor: pointer;"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                @click="clickUserInfo(post.nickname)">
                                {{ post.nickname }}
                            </a>
                            <span v-else>
                                {{ post.nickname }}
                            </span>
                        </td>
                        <td>{{ post.view_count }}</td>
                        <td class="text-muted">{{ formatDate(post.create_date) }}</td>
                    </tr>
                </tbody>
                <!-- 데스크탑-->
                <!--모바일-->
                <div v-if="this.isMobile" class="list-group">
                    <a v-for="notice in notices" :key="notice.bno" href="#"
                        class="list-group-item list-group-item-action rounded-0 bg-success border-0 border-bottom"
                        style="--bs-bg-opacity: .5;" @click="goToBoardPage(notice.bno)">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">[공지사항] {{ notice.title }}</h6>
                        </div>
                        <small style="float: left;">{{ notice.nickname }}</small>
                        <small style="float: right;">{{ formatDate(notice.create_date) }}</small>
                    </a>
                    <a v-for="post in posts" :key="post.bno" href="#"
                        class="list-group-item list-group-item-action rounded-0 border-0 border-bottom"
                        @click="goToBoardPage(post.bno)">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">{{ post.title }}</h6>
                        </div>
                        <small style="float: left;">{{ post.nickname }}</small>
                        <small style="float: right;">{{ formatDate(post.create_date) }}</small>
                    </a>
                </div>
                <!--모바일-->
                <button @click="goToWritePage" class="btn btn-light my-2" type="button"
                    style="width: max-content; float: left;">글작성</button>
            </table>
            <!-- 반복문으로 페이징 출력, 현재 보고있는 페이지에 active클래스 추가 -->
            <nav class="">
                <ul class="pagination">
                    <li class="page-item">
                        <a :class="[pagination.hasPrev == true ? '' : 'd-none']" @click="goToPage(pagination.startPage - 1)"
                            class="page-link text-secondary" style="cursor: pointer;">&laquo;</a>
                    </li>

                    <li v-for="i in pagination.endPage - pagination.startPage + 1" :key="i" class="page-item">
                        <a @click="goToPage(pagination.startPage + i - 1)"
                            :class="[pagination.startPage + i - 1 == this.currentPage ? 'bg-secondary text-light' : '']"
                            class="page-link text-secondary" style="cursor: pointer;">
                            {{ pagination.startPage + i - 1 }}
                        </a>
                    </li>

                    <li class="page-item">
                        <a :class="[pagination.hasNext == true ? '' : 'd-none']" @click="goToPage(pagination.endPage + 1)"
                            class="page-link text-secondary" style="cursor: pointer;">&raquo;</a>
                    </li>
                </ul>
            </nav>
        </div>
    </main>
    <!-- 관리자용 모달 -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">회원 정보</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- 회원정보-->
                    <div>회원번호
                        <div>
                            {{ this.userInfo.id }}
                        </div>
                    </div>
                    <div>이메일
                        <div>
                            {{ this.userInfo.email }}
                        </div>
                    </div>
                    <div>닉네임
                        <div>
                            {{ this.userInfo.nickname }}
                        </div>
                    </div>
                    <!-- 회원정보-->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                    <button type="button" class="btn btn-danger"
                        @click="clickKickUser(this.userInfo.email, this.userInfo.password)">회원강퇴</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    beforeRouteLeave(to, from, next) {
        // 라우터 떠나기 전에 세션스토리지에 정보들 저장
        // console.log("BEFORE ROUTER LEAVE 실행")
        const searchData =
        {
            "category": this.category,
            "search": this.search,
        }
        sessionStorage.setItem('searchInfo', JSON.stringify(searchData));
        next()
    },
    beforeRouteEnter(to, from, next) {
        // /board 이외의 경로에서 에서 진입한 경우엔 세션 스토리지 초기화
        if (from.name !== "Board") {
            // console.log("TO NAME " + to.name)
            // console.log("FROM NAME " + from.name)
            // console.log('검색 데이터 초기화')
            sessionStorage.removeItem('searchInfo')
        }
        next()
    },
    data() {
        return {
            posts: [],
            notices: [],
            userInfo: [],
            pagination:
            {
                "startPage": 1,
                "hasPrev": false,
                "totalPages": 1,
                "hasNext": false,
                "endPage": 1
            },
            currentPage: this.$route.query.currentPage,
            hasPrev: null,
            hasNext: null,
            user_id: '',
            category: 'title',
            search: '',
            isMobile: false,
        }
    },
    created() {
        if (innerWidth < 576) {
            this.isMobile = true
        }
        if (localStorage.getItem('loginInfo') == null) {
            this.user_id = ''
        } else {
            this.user_id = JSON.parse(localStorage.getItem('loginInfo')).id;
            console.log(this.user_id)
        }
    },
    mounted() {
        if (sessionStorage.getItem('searchInfo') !== null) {
            const searchInfo = JSON.parse(sessionStorage.getItem('searchInfo'));
            this.category = searchInfo.category
            this.search = searchInfo.search
            // console.log('검색 데이터 불러오기 성공')
        }
        this.loadPosts()
        this.loadNotice()
    },
    watch: {
        '$route.query': {
            handler: function (newVal, oldVal) {
                if (newVal.currentPage != oldVal.currentPage) {
                    this.currentPage = newVal.currentPage
                }
            },
            deep: true
        },
        currentPage: function (newPage) {
            this.goToPage(newPage)
            this.loadPosts()
        }
    },
    methods: {
        loadPosts() {
            axios.get(`/boards/list?currentPage=${this.currentPage}&category=${this.category}&search=${this.search}`)
                .then((response) => {
                    this.posts = response.data.boardList
                    this.pagination = response.data.pagination
                    if (this.currentPage > this.pagination.endPage) {
                        // console.log("현재 페이지가 더 클 경우")
                        this.currentPage = this.pagination.endPage
                    }
                    // console.log("CATEGORY: " + this.category)
                    // console.log("SEARCH: " + this.search)
                }
                )
                .catch(error => {
                    alert(error.response.data.message)
                })
        },
        loadNotice() {
            // console.log("공지사항 가져오기")
            axios.get('/boards/notice')
                .then(response => {
                    this.notices = response.data
                    console.log(this.notices)
                })
                .catch(error => {
                    alert(error.response.data.message)
                })
        },
        goToPage(page) {
            this.$router.push(`/boards?currentPage=${page}`)
        },
        formatDate(date) {
            const today = new Date();

            const year = String(today.getFullYear()).slice(-2);
            const month = ('0' + (today.getMonth() + 1)).slice(-2);
            const day = ('0' + today.getDate()).slice(-2);

            const dateString = year + '.' + month + '.' + day;
            const postDate = date.split('/');
            if (postDate[0] == dateString) {
                return postDate[1]
            } else {
                return postDate[0]
            }
        },
        goToWritePage() {
            this.$router.push('/boardWrite')
        },
        goToBoardPage(bno) {
            this.$router.push(`/board/${bno}?currentPage=1`)
        },
        clickUserInfo(nickname) {
            axios.get(`/users/info?nickname=${nickname}`)
                .then(response => {
                    this.userInfo = response.data
                    // console.log('관리자가 받아온 유저 정보 ' + this.userInfo)
                })
        },
        clickKickUser(email, password) {
            if (!confirm("해당 회원을 강퇴하시겠습니까?")) {
                alert('취소되었습니다')
            } else {
                const userData =
                {
                    "email": email,
                    "password": password
                }
                axios.delete('/users',
                    {
                        headers: { "Content-Type": `application/json` },
                        data: {
                            email: email,
                            password: password,
                        }
                    })
                    .then(response => {
                        alert('강퇴 처리됨')
                        router.go(0)
                    })
                    .catch(error => { alert(error.response.data.message) })
            }
        },
        categoryValue(event) {
            this.category = event.target.value;
        },
        clickInit() {
            // sessionStorage.removeItem('searchInfo')
            this.$router.go(0)
            this.currentPage = 1
        }
    }
}
</script>

<style scoped>
body {
    font-family: "TmoneyRoundWindRegular", "TmoneyRoundWindExtraBold";
    display: block;
    margin: 0;
}

p {
    margin-right: 85%;
    margin-top: 5%;
}

hr {
    width: 100%;
}

.wrap_main {
    flex: 1;
    margin: 0 10px 0 10px;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0% auto;
    background-color: #fff;
    min-height: 809px;
}

.my_hover {
    color: #000;
    text-decoration: none;
}

.my_hover:hover {
    color: #555;
    text-decoration: underline;
}

@media (max-width: 576px) {
    .container {
        max-width: -webkit-fill-available;
    }
}</style>