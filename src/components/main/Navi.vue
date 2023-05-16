<template>
    <div class="col-12">
        <div class="card text-bg-dark mt-2" style="min-height: 230px; min-width: 100%">
            <img :src="this.getPartOfDay()" class="card-img opacity-50">
            <div class="card-img-overlay">
                <h1 class="card-title mt-2" style="font-weight: 700;">
                    <span>안녕하세요 {{ this.nickname }}님!</span>
                </h1>
                <h4 class="card-text mt-3" style="font-weight: 500;">
                    <span>{{ this.gptMessage }}</span>
                </h4>
                <p v-if="this.isLoading" class="card-text opacity-75">
                    <small>
                    - 메세지 생성까지 다소 시간이 소요될 수 있습니다
                    </small>
                    <span class="spinner-grow text-light" role="status" style="width: 10px; height: 10px;">
                        <span class="visually-hidden">Loading...</span>
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import morning from '@/assets/img/morning.jpg'
import afternoon from '@/assets/img/afternoon.jpg'
import evening from '@/assets/img/evening.jpg'

export default {
    data() {
        return {
            nickname: '방문자',
            gptMessage: '',
            isLoading: false,
            morning: morning,
            afternoon: afternoon,
            evening: evening,
        }
    },
    mounted() {
        this.getGptMessage()
    },
    methods: {
        getGptMessage() {
            this.isLoading = true
            this.setNickname()
            const data = sessionStorage.getItem('gptMessage');
            if(data != null || data != undefined) {
                this.gptMessage = data
                this.isLoading = false;
            } else {
                axios.get('/api/gpt')
                .then(response => {
                    const data = JSON.parse(JSON.stringify(response.data.choices));
                    this.gptMessage = data[0].message.content;
                    this.isLoading = false;
                    sessionStorage.setItem('gptMessage', this.gptMessage);
                })
                .catch(error => {
                    console.log(error)
                })
            }
        },
        setNickname() {
            const data = JSON.parse(localStorage.getItem('loginInfo'));
            if(data != null || data != undefined) {
                this.nickname = data.nickname
            } else {
                this.nickname = '방문자'
            }
        },
        getPartOfDay() {
            const date = new Date();
            const hour = date.getHours();
            if (hour >= 20 || hour < 6) {
                return this.evening;
            } else if (hour >= 6 && hour < 12) {
                return this.morning;
            } else {
                return this.afternoon;
            }
        }
    }
}
</script>