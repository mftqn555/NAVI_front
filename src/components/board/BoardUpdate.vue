<template>
    <div class="wrap_main">
        <div class="container">
            <div class="px-4 py-6 sm:px-0">
                <div>
                    <h4 class="pt-3">글 수정</h4>
                    <hr class="mt-0 border border-dark border-2 opacity-75">
                    <label for="title" class="form-label mt-3">
                        <h5>제목</h5>
                    </label>
                    <input type="text" v-model="title" class="form-control mb-3" id="title" placeholder="제목을 입력하세요">
                </div>
                <div>
                    <label for="title" class="form-label mt-3">
                        <h5>본문</h5>
                    </label>
                    <ckeditor :editor="editor" v-model="content" :config="editorConfig"></ckeditor>
                    <button @click="update()" class="btn btn-light my-2 float-right" type="button">수정</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import axios from 'axios';

export default {
    data() {
        return {
            bno: this.$route.params.bno,
            user_id: JSON.parse(localStorage.getItem('loginInfo')).id,
            nickname: JSON.parse(localStorage.getItem('loginInfo')).nickname,
            title: this.$route.params.title,
            content: this.$route.params.content,
            editor: Editor,
            editorConfig: {
                simpleUpload: {
                    uploadUrl: 'https://api.mysecnavi.store/boards/upload',
                    withCredentials: true,
                },
                mediaEmbed: {
                    previewsInData: true
                }
            },
        };
    },
    created() {
        if (this.title === null || this.content === null || this.bno === null) {
            alert('잘못된 접근입니다')
            this.$router.push(`/board/${this.bno}?currentPage=1`)
        }
    },
    methods: {
        update() {
            if (!confirm('작성한 글을 등록하시겠습니까?')) {
                alert('취소되었습니다')
            } else {
                const data = {
                    bno: this.bno,
                    title: this.title,
                    content: this.content,
                }
                axios.patch(`/boards/${this.bno}`, JSON.stringify(data), { headers: { "Content-Type": `application/json` } })
                    .then(response => {
                        this.$router.push(`/board/${this.bno}?currentPage=1`)
                    })
                    .catch(error => {
                        alert(error.response.data.message)
                    })
            }
        },
    },
};
</script>

<style>
.container {
    width: 1000px !important;
    background-color: #fff;
    max-width: fit-content;
}

textarea {
    text-decoration: none;
    border: 0;
    outline: none;
}

.wrap_main {
    flex: 1;
    margin: 0 10px 0 10px;
}

.ck-editor__editable {
    height: 600px;
}

@media (max-width: 576px) {
    .container {
        max-width: -webkit-fill-available;
    }
}
</style>