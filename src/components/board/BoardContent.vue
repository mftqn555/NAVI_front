<template>
    <div class="">
        <p class="h5 fw-bold mt-5">{{ boardContent.title }}</p>
        <hr>
        <div class="d-flex justify-content-between my-title">
            <p class="title_mg">{{ boardContent.nickname }} &nbsp;|&nbsp; <span class="text-muted">{{ boardContent.create_date }}</span></p>
            <p class="text-muted title_mg">조회수 {{ boardContent.view_count }}</p>
        </div>
        <div class="my-5 mx-3" v-html="boardContent.content"></div>
        <hr>
        <div class="btn-group btn-group-sm mt-2">
            <button v-show="this.user_id === boardContent.user_id" @click="goToUpdate()" type="button" class="btn btn-outline-secondary">
                수정
            </button>
            <button v-show="this.user_id === boardContent.user_id || this.nickname === '관리자'" @click="deleteBoard()" type="button" class="btn btn-outline-secondary">삭제</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            user_id: '',
            nickname: '',
            boardContent: [],
            bno: this.$route.params.bno,
        }
    },
    created() {
        let storage = localStorage.getItem('loginInfo');
        if (storage) {
            this.user_id = JSON.parse(localStorage.getItem('loginInfo')).id
            this.nickname = JSON.parse(localStorage.getItem('loginInfo')).nickname
        }
        axios.get(`/boards/${this.bno}`)
            .then(response => {
                this.boardContent = response.data
                // console.log(this.boardContent)
            })
    },
    methods: {
        goToUpdate() {
            const bno = this.bno
            const title = this.boardContent.title
            const content = this.boardContent.content
            this.$router.push(
                {
                    name: "BoardUpdate",
                    params:
                    {
                        bno: bno,
                        title : title,
                        content : content
                    },
                })
        },
        deleteBoard() {
            if (!confirm('해당 게시글을 삭제하시겠습니까?')) {
                alert('취소되었습니다')
            } else {
                axios.delete(`/boards/${this.bno}`)
                    .then(response => {
                        alert('삭제되었습니다')
                        this.$router.push('/boards?currentPage=1')
                    })
                    .catch(error => {
                        alert(error.response.data.message)
                    })
            }
        },
    }
}
</script>

<style scoped>
hr {
    margin: 0;
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
</style>