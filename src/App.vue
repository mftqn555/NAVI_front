<template>
    <div class="app">
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './components/main/Header.vue';
import Footer from './components/main/Footer.vue';
import MainContent from './components/main/MainContent.vue';

export default {
    name: 'App',
    components: {
        Header,
        Footer,
        MainContent
    }
}
</script>
  
<style>
html>

/**/
body {
    overflow-y: scroll;
}

.app {
    /*background-color: #f4f6f8;*/
    background-color: #cfcfcf;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

body {
    font-family: 'Pretendard', sans-serif;
    display: block;
    margin: 0;
}

@media (max-width: 576px) {
    .app {
        background-color: #fff;
    }
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 900;
	font-display: swap;
	src: local('Pretendard Black'), url('./assets/font/Pretendard-Black.woff2') format('woff2'), url('./assets/font/Pretendard-Black.woff2') format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 800;
	font-display: swap;
	src: local('Pretendard ExtraBold'), url('./assets/font/Pretendard-ExtraBold.woff2') format('woff2'), url('./assets/font/Pretendard-ExtraBold.woff') format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 700;
	font-display: swap;
	src: local('Pretendard Bold'), url('./assets/font/Pretendard-Bold.woff2') format('woff2'), url('./assets/font/Pretendard-Bold.woff') format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 600;
	font-display: swap;
	src: local('Pretendard SemiBold'), url('./assets/font/Pretendard-SemiBold.woff2') format('woff2'), url('./assets/font/Pretendard-SemiBold.woff') format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 500;
	font-display: swap;
	src: local('Pretendard Medium'), url('./assets/font/Pretendard-Medium.woff2') format('woff2'), url('./assets/font/Pretendard-Medium.woff') format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 400;
	font-display: swap;
	src: local('Pretendard Regular'), url('./assets/font/Pretendard-Regular.woff2') format('woff2'), url('./assets/font/Pretendard-Regular.woff') format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 300;
	font-display: swap;
	src: local('Pretendard Light'), url('./assets/font/Pretendard-Light.woff2') format('woff2'), url('./assets/font/Pretendard-Light.woff') format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 200;
	font-display: swap;
	src: local('Pretendard ExtraLight'), url('./assets/font/Pretendard-ExtraLight.woff2') format('woff2'), url('./assets/font/Pretendard-ExtraLight.woff') format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 100;
	font-display: swap;
	src: local('Pretendard Thin'), url('./assets/font/Pretendard-Thin.woff2') format('woff2'), url('./assets/font/Pretendard-Thin.woff') format('woff');
}

/* @ckeditor/ckeditor5-image/theme/image.css */
.image {
    display: table;
    clear: both;
    text-align: center;
    margin: 0.9em auto;
    min-width: 50px;
}

/* @ckeditor/ckeditor5-image/theme/image.css */
.image img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    min-width: 100%;
}

/* @ckeditor/ckeditor5-image/theme/image.css */
.image-inline {
    /*
     * Normally, the .image-inline would have "display: inline-block" and "img { width: 100% }" (to follow the wrapper while resizing).;
     * Unfortunately, together with "srcset", it gets automatically stretched up to the width of the editing root.
     * This strange behavior does not happen with inline-flex.
     */
    display: inline-flex;
    max-width: 100%;
    align-items: flex-start;
}

/* @ckeditor/ckeditor5-image/theme/image.css */
.image-inline picture {
    display: flex;
}

/* @ckeditor/ckeditor5-image/theme/image.css */
.image-inline picture,
.image-inline img {
    flex-grow: 1;
    flex-shrink: 1;
    max-width: 100%;
}

/* @ckeditor/ckeditor5-image/theme/imageresize.css */
.image.image_resized {
    max-width: 100%;
    display: block;
    box-sizing: border-box;
}

/* @ckeditor/ckeditor5-image/theme/imageresize.css */
.image.image_resized img {
    width: 100%;
}

/* @ckeditor/ckeditor5-image/theme/imageresize.css */
.image.image_resized>figcaption {
    display: block;
}

/* @ckeditor/ckeditor5-image/theme/imagecaption.css */
.image>figcaption {
    display: table-caption;
    caption-side: bottom;
    word-break: break-word;
    color: var(--ck-color-image-caption-text);
    background-color: var(--ck-color-image-caption-background);
    padding: .6em;
    font-size: .75em;
    outline-offset: -1px;
}

/* @ckeditor/ckeditor5-image/theme/imagestyle.css */
.image-style-block-align-left,
.image-style-block-align-right {
    max-width: calc(100% - var(--ck-image-style-spacing));
}

/* @ckeditor/ckeditor5-image/theme/imagestyle.css */
.image-style-align-left,
.image-style-align-right {
    clear: none;
}

/* @ckeditor/ckeditor5-image/theme/imagestyle.css */
.image-style-side {
    float: right;
    margin-left: var(--ck-image-style-spacing);
    max-width: 50%;
}

/* @ckeditor/ckeditor5-image/theme/imagestyle.css */
.image-style-align-left {
    float: left;
    margin-right: var(--ck-image-style-spacing);
}

/* @ckeditor/ckeditor5-image/theme/imagestyle.css */
.image-style-align-center {
    margin-left: auto;
    margin-right: auto;
}

/* @ckeditor/ckeditor5-image/theme/imagestyle.css */
.image-style-align-right {
    float: right;
    margin-left: var(--ck-image-style-spacing);
}

/* @ckeditor/ckeditor5-image/theme/imagestyle.css */
.image-style-block-align-right {
    margin-right: 0;
    margin-left: auto;
}

/* @ckeditor/ckeditor5-image/theme/imagestyle.css */
.image-style-block-align-left {
    margin-left: 0;
    margin-right: auto;
}

/* @ckeditor/ckeditor5-image/theme/imagestyle.css */
p+.image-style-align-left,
p+.image-style-align-right,
p+.image-style-side {
    margin-top: 0;
}

/* @ckeditor/ckeditor5-image/theme/imagestyle.css */
.image-inline.image-style-align-left,
.image-inline.image-style-align-right {
    margin-top: var(--ck-inline-image-style-spacing);
    margin-bottom: var(--ck-inline-image-style-spacing);
}

/* @ckeditor/ckeditor5-image/theme/imagestyle.css */
.image-inline.image-style-align-left {
    margin-right: var(--ck-inline-image-style-spacing);
}

/* @ckeditor/ckeditor5-image/theme/imagestyle.css */
.image-inline.image-style-align-right {
    margin-left: var(--ck-inline-image-style-spacing);
}
</style>