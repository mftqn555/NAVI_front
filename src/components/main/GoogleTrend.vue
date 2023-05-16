<template>
    <div class="my-2 col-sm-12 col-md-12 col-lg-8">
        <div id="googleTrend" class="carousel slide carousel-dark" data-bs-ride="carousel">
            <div class="carousel-inner border-top border-bottom py-5" style="min-height: 850px;">
                <div v-if="this.isLoading" class="spinner-border text-secondary" role="status" style="margin: 50%;">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div v-else class="carousel-item active" data-bs-interval="10000">
                    <div v-for="(item, index) in trends.slice(0, 5)" class="list-group rounded-0">
                        <a class="list-group-item list-group-item-action flex-column align-items-start border-0">
                            <div class="row">
                                <div class="col-lg-10 col-md-10 col-sm-9 p-0 ps-2 pe-4">
                                    <p class="h5 mb-2" style="font-weight: bold;">
                                        {{ index + 1 }}.
                                        {{ item.title }}
                                    </p>
                                    <div v-if="Array.isArray(item['ht:news_item'])"
                                        v-for="(news, index) in item['ht:news_item']" :key="index">
                                        <div>
                                            {{ this.decode(news['ht:news_item_title']) }}<br>
                                            <a :href="news['ht:news_item_url']" class="text-dark opacity-50 my_hover"
                                                style="font-size: small;">
                                                [{{ news['ht:news_item_source'] }}]
                                            </a>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div>
                                            {{ this.decode(item['ht:news_item']['ht:news_item_title']) }} <br>
                                            <a :href="item['ht:news_item']['ht:news_item_url']"
                                                class="text-dark opacity-50 my_hover" style="font-size: small;">
                                                [{{ item['ht:news_item']['ht:news_item_source'] }}]
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-3 p-1">
                                    <img :src="item['ht:picture']" style="float: right;" class="border border-3" />
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="carousel-item" data-bs-interval="10000">
                    <div v-for="(item, index) in trends.slice(5, 10)" class="list-group rounded-0">
                        <a class="list-group-item list-group-item-action flex-column align-items-start border-0">
                            <div class="row">
                                <div class="col-lg-10 col-md-10 col-sm-9 p-0 ps-2 pe-4">
                                    <p class="h5 mb-2" style="font-weight: bold;">
                                        {{ index + 6 }}.
                                        {{ item.title }}
                                    </p>
                                    <div v-if="Array.isArray(item['ht:news_item'])"
                                        v-for="(news, index) in item['ht:news_item']" :key="index">
                                        <div>
                                            {{ this.decode(news['ht:news_item_title']) }}<br>
                                            <a :href="news['ht:news_item_url']" class="text-dark opacity-50 my_hover"
                                                style="font-size: small;">
                                                [{{ news['ht:news_item_source'] }}]
                                            </a>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div>
                                            {{ this.decode(item['ht:news_item']['ht:news_item_title']) }} <br>
                                            <a :href="item['ht:news_item']['ht:news_item_url']"
                                                class="text-dark opacity-50 my_hover" style="font-size: small;">
                                                [{{ item['ht:news_item']['ht:news_item_source'] }}]
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-3 p-1">
                                    <img :src="item['ht:picture']" style="float: right;" class="border" />
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="carousel-item" data-bs-interval="10000">
                    <div v-for="(item, index) in trends.slice(10, 15)" class="list-group rounded-0">
                        <a class="list-group-item list-group-item-action flex-column align-items-start border-0">
                            <div class="row">
                                <div class="col-lg-10 col-md-10 col-sm-9 p-0 ps-2 pe-4">
                                    <p class="h5 mb-2" style="font-weight: bold;">
                                        {{ index + 11 }}.
                                        {{ item.title }}
                                    </p>
                                    <div v-if="Array.isArray(item['ht:news_item'])"
                                        v-for="(news, index) in item['ht:news_item']" :key="index">
                                        <div>
                                            {{ this.decode(news['ht:news_item_title']) }}<br>
                                            <a :href="news['ht:news_item_url']" class="text-dark opacity-50 my_hover"
                                                style="font-size: small;">
                                                [{{ news['ht:news_item_source'] }}]
                                            </a>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div>
                                            {{ this.decode(item['ht:news_item']['ht:news_item_title']) }} <br>
                                            <a :href="item['ht:news_item']['ht:news_item_url']"
                                                class="text-dark opacity-50 my_hover" style="font-size: small;">
                                                [{{ item['ht:news_item']['ht:news_item_source'] }}]
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-3 p-1">
                                    <img :src="item['ht:picture']" style="float: right;" class="border border-3" />
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="carousel-item" data-bs-interval="10000">
                    <div v-for="(item, index) in trends.slice(15, 20)" class="list-group rounded-0">
                        <a class="list-group-item list-group-item-action flex-column align-items-start border-0">
                            <div class="row">
                                <div class="col-lg-10 col-md-10 col-sm-9 p-0 ps-2 pe-4">
                                    <p class="h5 mb-2" style="font-weight: bold;">
                                        {{ index + 16 }}.
                                        {{ item.title }}
                                    </p>
                                    <div v-if="Array.isArray(item['ht:news_item'])"
                                        v-for="(news, index) in item['ht:news_item']" :key="index">
                                        <div>
                                            {{ this.decode(news['ht:news_item_title']) }}<br>
                                            <a :href="news['ht:news_item_url']" class="text-dark opacity-50 my_hover"
                                                style="font-size: small;">
                                                [{{ news['ht:news_item_source'] }}]
                                            </a>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div>
                                            {{ this.decode(item['ht:news_item']['ht:news_item_title']) }} <br>
                                            <a :href="item['ht:news_item']['ht:news_item_url']"
                                                class="text-dark opacity-50 my_hover" style="font-size: small;">
                                                [{{ item['ht:news_item']['ht:news_item_source'] }}]
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-3 p-1">
                                    <img :src="item['ht:picture']" style="float: right;" class="border border-3" />
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev my_left_slide" type="button" data-bs-target="#googleTrend"
                data-bs-slide="prev" style="height: 0px;">
                <span class="carousel-control-prev-icon my_left_slide" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next my_right_slide" type="button" data-bs-target="#googleTrend"
                data-bs-slide="next" style="height: 0px;">
                <span class="carousel-control-next-icon my_right_slide" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    <!-- <div>
        <div  :key="index">
            <h2>{{ item.title }}</h2>
            <ul>
                <li v-for="(news, index) in item['ht:news_item']" :key="index">
                    <h3>{{ news['ht:news_item_title'] }}</h3>
                    <p>{{ news['ht:news_item_snippet'] }}</p>
                    <a :href="news['ht:news_item_url']">{{ news['ht:news_item_source'] }}</a>
                </li>
            </ul>
        </div>
    </div> -->
    <!-- 캐러셀 -->
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
    data() {
        return {
            trends: [],
            currentPage: '',
            isLoading: true,
        }
    },
    created() {
        this.axiosInstance = axios.create({
            baseURL: '',
        });
    },
    mounted() {
        if(sessionStorage.getItem('googleTrend') != null) {
            this.trends = JSON.parse(sessionStorage.getItem('googleTrend'))
            this.isLoading = false
        } else {
            this.loadGoogleTrend();
        }
    },
    methods: {
        reloadGoogleTrend() {
            this.isLoading = true;
            sessionStorage.removeItem('googleTrend')
        },
        loadGoogleTrend() {
            // axios.defaults.baseURL = '';
            console.log('자식함수 실행')
            this.axiosInstance.get('/google/rss?geo=KR')
                .then((response) => {
                    console.log('통신완료')
                    const xml = response.data
                    const xml2js = require('xml2js');

                    const parser = new xml2js.Parser({ explicitArray: false });
                    parser.parseString(xml, (err, result) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        // const data = result.rss.channel[0].item;
                        const data = result;
                        this.trends = JSON.parse(JSON.stringify(data.rss.channel.item))
                        sessionStorage.setItem('googleTrend', JSON.stringify(this.trends))
                        this.isLoading = false
                    });

                })
                .catch(error => {
                    alert('알 수 없는 오류가 발생했습니다')
                })
        },
        decode(string) {
            var txt = document.createElement("textarea");
            txt.innerHTML = string;
            return txt.value;
        },
    },
}
</script>

<style>
.my_hover {
    color: #000;
    text-decoration: none;
}

.my_hover:hover {
    color: #555;
    text-decoration: underline;
}

.my_left_slide {
    position: absolute;
    left: -7%;
    bottom: 18px;
}

.my_right_slide {
    position: absolute;
    right: 430%;
    bottom: 18px;
}

/* 992 768 576 */
@media (max-width: 1200px) {
    .my_right_slide {
        position: absolute;
        right: 420%;
        bottom: 18px;
    }
}

@media (max-width: 992px) {
    .my_right_slide {
        position: absolute;
        right: 450%;
        bottom: 18px;
    }
}

@media (max-width: 762px) {
    .my_right_slide {
        position: absolute;
        right: 370%;
        bottom: 18px;
    }
}

@media (max-width: 576px) {

}

</style>