<template>
    <main class="wrap_main">
        <div class="my-container">
            <div class="container py-4">
                <BoardContent />
                <BoardComment />
            </div>
        </div>
    </main>
</template>

<script>
import BoardComment from './BoardComment.vue';
import BoardContent from './BoardContent.vue';
import axios from 'axios';

export default {
    beforeRouteLeave(to, from, next) {
        this.end = new Date().getSeconds();
        this.result = this.end - this.start
        if (this.result < 3) {
            this.cancelViewCount()
        }
        next();
    },
    components: {
        BoardComment,
        BoardContent
    },
    data() {
        return {
            boardContent: [],
            bno: this.$route.params.bno,
            start: '',
            end: '',
            result: null,
            viewCount: null,
        }
    },
    mounted() {
        this.start = new Date().getSeconds();
        this.viewCount = setTimeout(() => {
            this.addViewCount(this.bno)
        }, 3000)
    },
    methods: {
        addViewCount(bno) {
            axios.post(`/boards/${bno}/view`)
                .then(response => {
                    console.log("조회수 1 증가")
                })
        },
        cancelViewCount() {
            clearTimeout(this.viewCount)
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

.card {
    margin-bottom: 5px;
}

/* Container styles */
.wrap_main {
    flex: 1;
    margin: 0 10px 0 10px;
}

.my-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 1000px;
    margin: 0% auto;
    background-color: #fff;
    min-height: 809px;
}
</style>