<template>
    <div class="card border-0 border-top rounded-0 my-2 bookmark">
        <div class="card-body text-center">
            <a href="https://google.com" target="_blank"><img :src="google" class="me-3" /></a>
            <a href="https://gmail.com" target="_blank"><img :src="gmail" class="me-3" /></a>
            <a href="https://youtube.com" target="_blank"><img :src="youtube" class="me-3" /></a>
            <a href="https://naver.com" target="_blank"><img :src="naver" class="me-3" /></a>
            <a href="https://cafe.naver.com" target="_blank"><img :src="naverCafe" class="me-3" /></a>
        </div>
    </div>
</template>

<script>
import google from '@/assets/icon/bookmark/Google.png'
import gmail from '@/assets/icon/bookmark/Gmail.png'
import naver from '@/assets/icon/bookmark/Naver.png'
import naverCafe from '@/assets/icon/bookmark/NaverCafe.png'
import youtube from '@/assets/icon/bookmark/Youtube.png'

export default {
    data() {
        return {
            google: google,
            gmail: gmail,
            naver: naver,
            naverCafe: naverCafe,
            youtube: youtube,
        }
    }
}
</script>

<style></style>