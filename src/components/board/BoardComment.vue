<template>
    <div>
        <div v-show="comments != ''" class="mt-5 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chat-fill float-start me-2" viewBox="0 0 16 16">
                <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
            </svg>
            <h5>댓글</h5>
        </div>
        <!-- 댓글 전체 출력-->
        <div v-if="comments != ''" v-for="comment in comments" :key=comment.cno>
            <!-- 일반 댓글-->
            <div v-show="comment.re_cno == comment.cno" class="border-0 card mb-3">
                <div>
                    <div
                        class="card-header d-flex justify-content-between align-items-center border rounded-0 card_header_height">
                        <div>{{ comment.nickname }}</div>
                        <div class="d-flex justify-content-end">
                            <div class="py-2 pe-3 text-muted" style="font-size: 0.9rem;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-clock me-1" viewBox="0 0 16 16">
                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                </svg>
                                {{ comment.create_date }}
                            </div>
                            <div v-show="user_id != '' || this.user_id === 0" class="dropdown">
                                <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                </button>
                                <ul class="dropdown-menu" style="text-align: center;">
                                    <li class="btn btn-link p-0 text-black text-decoration-none dropdown-item"
                                        @click="clickReply(comment.cno)">
                                        답글
                                    </li>
                                    <li v-show="this.nickname == comment.nickname"
                                        class="btn btn-link p-0 text-black text-decoration-none dropdown-item"
                                        @click="clickUpdate(comment.cno)">
                                        수정
                                    </li>
                                    <li v-show="this.nickname == comment.nickname || this.user_id === 0"
                                        class="btn btn-link p-0 text-black text-decoration-none dropdown-item"
                                        @click="clickDelete(comment.cno)">
                                        삭제
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="card-text">{{ comment.content }}</p>
                    </div>
                </div>


                <!-- 일반 댓글 수정창: 기본 숨김 -->
                <div v-show="this.nickname == comment.nickname &&
                    isHidden.data == false &&
                    this.updateCno == comment.cno ||
                    this.replyCno == comment.cno">
                    <div class="card mt-2 ms-4">
                        <div class="card-body">
                            <textarea v-if="this.updateCno != null" v-model="this.updateContent"
                                placeholder="댓글 수정"></textarea>
                            <textarea v-if="this.replyCno != null" v-model="this.comment" placeholder="답글 작성"></textarea>
                        </div>
                    </div>
                    <div class="mt-3 d-grid gap-2 d-md-flex justify-content-md-end">
                        <button v-if="this.updateCno != null" @click="updateComment()" class="btn btn-primary me-md-2"
                            type="button">수정</button>
                        <button v-if="this.replyCno != null" @click="addComment()" class="btn btn-primary me-md-2"
                            type="button">등록</button>
                        <button class="btn btn-primary me-md-2" type="button" @click="clickCancel()">취소</button>
                    </div>
                </div>
                <!-- 일반댓글 수정창: 기본 숨김 -->


            </div>
            <!-- 일반 댓글-->

            <!-- 답글 있으면 출력-->
            <div v-show="comment.re_cno != comment.cno" class="card border-0 mb-3 ms-4">


                <!-- 답글-->
                <div
                    class="card-header d-flex justify-content-between align-items-center border rounded-0 card_header_height">
                    <div>{{ comment.nickname }}</div>
                    <div class="d-flex justify-content-end">
                        <div class="py-2 pe-3 text-muted" style="font-size: 0.9rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-clock me-1" viewBox="0 0 16 16">
                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                            </svg>
                            {{ comment.create_date }}
                        </div>
                        <div v-show="user_id !== '' || this.user_id === 0 && this.nickname === comment.nickname"
                            class="dropdown">
                            <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                            </button>
                            <ul class="dropdown-menu" style="text-align: center;">
                                <li v-show="this.nickname === comment.nickname"
                                    class="btn btn-link p-0 text-black text-decoration-none dropdown-item"
                                    @click="clickUpdate(comment.cno)">
                                    수정
                                </li>
                                <li v-show="this.nickname === comment.nickname || this.user_id === 0"
                                    class="btn btn-link p-0 text-black text-decoration-none dropdown-item"
                                    @click="clickDelete(comment.cno)">
                                    삭제
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <p class="card-text">{{ comment.content }}</p>
                </div>
                <!-- 답글-->


                <!-- 답글 수정창-->
                <div v-show="this.nickname == comment.nickname && isHidden.data == false && this.updateCno == comment.cno">
                    <div class="card mt-2 ms-4">
                        <div class="card-body">
                            <textarea v-model="this.updateContent" placeholder="댓글 수정"></textarea>
                        </div>
                    </div>
                    <div class="mt-3 d-grid gap-2 d-md-flex justify-content-md-end">
                        <button @click="updateComment()" class="btn btn-primary me-md-2" type="button">수정</button>
                        <button class="btn btn-primary me-md-2" type="button" @click="clickCancel()">취소</button>
                    </div>
                </div>
                <!-- 답글 수정창-->


            </div>
            <!-- 답글 있으면 출력-->
        </div>
        <!-- 댓글 전체 출력-->
        <!-- 댓글 없을시-->
        <div v-else>
            <div class="card text-center border-0 my-5 opacity-50">
                <div class="card-body">
                    <h5 class="card-title text-muted">작성된 댓글이 없습니다</h5>
                </div>
            </div>
        </div>

        <!-- 댓글쓰기: 로그인 안했으면 숨겨야됨-->
        <div v-show="this.user_id != '' || this.user_id === 0">
            <div class="card mt-5">
                <div class="card-body">
                    <textarea v-model="this.comment" placeholder="댓글 쓰기"
                        :class="[this.replyCno != null ? 'd-none' : '']"></textarea>
                </div>
            </div>
            <div class="mt-3 d-grid gap-2 d-md-flex justify-content-md-end">
                <button @click="addComment()" class="btn btn-primary me-md-2" type="button">등록</button>
            </div>
        </div>
        <!-- 댓글쓰기: 로그인 안했으면 숨겨야됨-->


        <!-- 페이징 -->
        <div class="d-flex justify-content-center mt-5" aria-label="...">
            <ul v-show="comments != ''" class="pagination">
                <li class="page-item">
                    <a :class="[pagination.hasPrev == true ? '' : 'd-none']" @click="goToPage(pagination.startPage - 1)"
                        class="page-link text-secondary" style="cursor: pointer;">&laquo;</a>
                </li>

                <li v-for="i in pagination.endPage - pagination.startPage + 1" :key="i" class="page-item">
                    <a @click="goToPage(pagination.startPage + i - 1)"
                        :class="[pagination.startPage + i - 1 == this.currentPage ? 'bg-secondary text-light' : '']"
                        class="page-link" style="cursor: pointer;">
                        {{ pagination.startPage + i - 1 }}
                    </a>
                </li>

                <li class="page-item">
                    <a :class="[pagination.hasNext == true ? '' : 'd-none']" @click="goToPage(pagination.endPage + 1)"
                        class="page-link text-secondary" style="cursor: pointer;">&raquo;</a>
                </li>
            </ul>
        </div>
        <!-- 페이징 -->
    </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';
import { reactive } from 'vue';

export default {
    data() {
        return {
            comments: [],
            pagination:
            {
                "startPage": 1,
                "hasPrev": false,
                "totalPages": 1,
                "hasNext": false,
                "endPage": 1
            },
            bno: this.$route.params.bno,
            currentPage: this.$route.query.currentPage,
            hasPrev: null,
            hasNext: null,

            user_id: '',
            nickname: '',

            comment: '',

            updateContent: '',
            replyContent: '',
            updateCno: null,
            replyCno: null,

            isHidden: reactive({
                data: true
            }),

        }
    },
    created() {
        this.loadComments()
        console.log("COMMENTS 배열값: " + this.comments)
        let storage = localStorage.getItem('loginInfo');
        if (storage) {
            this.user_id = JSON.parse(localStorage.getItem('loginInfo')).id
            this.nickname = JSON.parse(localStorage.getItem('loginInfo')).nickname
        }
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
            this.loadComments()
        }
    },
    methods: {
        loadComments() {
            axios.get(`/comments/${this.bno}?currentPage=${this.currentPage}`)
                .then(response => {
                    this.comments = response.data.commentList
                    this.pagination = response.data.pagination
                })
                .catch(error => {
                    alert(error.response.data.message)

                })
        },
        goToPage(page) {
            this.$router.push(`/board/${this.bno}?currentPage=${page}`)
        },
        addComment() {
            const commentData =
            {
                bno: this.bno,
                user_id: this.user_id,
                content: this.comment,
                nickname: this.nickname,
                re_cno: this.replyCno,
            }
            axios.post(`/comments`,
                JSON.stringify(commentData),
                { headers: { "Content-Type": `application/json` } })
                .then(response => {
                    router.go(0)
                })
                .catch(error => {
                    alert(error.response.data.message)

                })
        },
        updateComment() {
            const commentData =
            {
                cno: this.updateCno,
                content: this.updateContent,
            }
            axios.patch(`/comments`,
                JSON.stringify(commentData),
                { headers: { "Content-Type": `application/json` } })
                .then(response => {
                    router.go(0)
                })
                .catch(error => {
                    alert(error.response.data.message)

                })
        },
        clickUpdate(cno) {
            this.updateCno = cno
            this.isHidden.data = false
        },
        clickReply(cno) {
            this.replyCno = cno
            this.isHidden.data = false;
        },
        clickCancel() {
            this.updateCno = null;
            this.replyCno = null;
            this.isHidden.data = true;
        },
        clickDelete(cno) {
            if (!confirm('댓글을 삭제하시겠습니까?')) {
                alert('취소되었습니다')
            } else {
                axios.delete(`/comments/${cno}`)
                    .then(response => {
                        router.go(0)
                    })
                    .catch(error => {
                        alert(error.response.data.message)

                    })
            }
        }

    }
}
</script>

<style scoped>
hr {
    margin: 0;
}

textarea {
    width: -webkit-fill-available;
    height: 3rem;
    border: none;
    resize: none;
}

.my-title {
    background-color: aliceblue;
    height: 35px;
    padding: 2px 20px 0 10px;
    font-size: 14px;
}

.title_mg {
    margin: 0.3rem;
}

.card {
    margin-bottom: 5px;
}

.card_header_height {
    height: 40px;
}

.card_body_height {
    height: 15px;
}
</style>