<template>
    <main class="wrap_main">
        <div class="my-container">
            <div class="container py-4 board_mobile">
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
                    // console.log("조회수 1 증가")
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

@media (max-width: 576px) {
    .board_mobile {
        padding: 0 !important;
    }

    .container {
        max-width: -webkit-fill-available;
    }
}</style>