<template>
    <div class="wrap_main">
        <div class="container">
            <div class="row">
                <Navi/>
            </div>
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-8">
                    <div class="h4 mt-4" style="font-weight: 800; font-size: 1.6rem;"> &nbsp;&nbsp; 📣 오늘의 핫이슈
                        <div class="float-end text-muted mt-3" style="font-size: 0.9rem;">
                            <span>
                                <a @click="reloadGooleTrend()" style="cursor: pointer;">
                                    <img :src="reloadIcon" width="25" height="25" class="me-2" />
                                </a>
                            </span>
                            <span>{{ today() }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <GoogleTrend ref="googleTrend" :key="gTrendKey" />
                <div id="title2_content" class="col-sm-12 col-md-12 col-lg-4">
                    <Bookmark/>     
                    <Weather :key="weatherKey" :reload="reloadWeather" />
                </div>
            </div>
            <div class="row">
                <h4 class="my-3 mt-5" style="font-weight: 800; font-size: 1.6rem;">🚏 대중교통 정보</h4>
                <div class="col-lg-8 col-md-12 col-sm-12">
                    <Bus/>
                </div>
                <div class="col-lg-8 col-md-12 col-sm-12">
                    <Subway/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GoogleTrend from './GoogleTrend.vue';
import Weather from './Weather.vue';
import Navi from './Navi.vue'
import Bookmark from './BookMark.vue'
import Subway from './Subway.vue'
import Bus from './Bus.vue';

import reloadIcon from '@/assets/icon/common/arrow-repeat.svg'

export default {
    components: {
        GoogleTrend,
        Weather,
        Navi,
        Bookmark,
        Subway,
        Bus,

    },
    data() {
        return {
            gTrendKey: 0,
            weatherKey: 0,
            reloadIcon: reloadIcon,
        }
    },
    methods: {
        today() {
            const now = new Date();

            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            const day = now.getDate();

            const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
            const dayOfWeek = daysOfWeek[now.getDay()];

            return `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`;
        },
        reloadGooleTrend() {
            console.log('함수호출')
            this.$refs.googleTrend.reloadGoogleTrend()
            this.gTrendKey += 1
        },
        reloadWeather() {
            sessionStorage.removeItem('weatherItem')
            this.weatherKey += 1
        },
    }
}
</script>

<style>
.container {
    width: 1000px !important;
    background-color: #fff;
    max-width: fit-content;
}

.wrap_main {
    flex: 1;
    margin: 0 10px 0 10px;
}

@media (max-width: 992px) {

    #title2 {
        position: absolute;
        bottom: -3%;

    }

    #title2_content {
        margin-top: 50px;
    }

    .weather {
        margin-right: 5px;
    }
}

@media (max-width: 992px) {
    .my_mg {
        margin-right: 7px;
    }
}
</style>