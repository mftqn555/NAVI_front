<template>
    <header>
        <div class="header-container">
            <div class="logo hover-muted">
                <router-link id="logo" class="text-decoration-none text-white hover-effect" to="/" style="font-weight: 800;">나비</router-link>
            </div>
            <nav>
                <ul>
                    <li><router-link class="text-white hover-effect" to="/boards?currentPage=1">자유게시판</router-link></li>
                    <li><router-link class="text-white hover-effect" to="/info" v-if="loginInfo != null" >내정보</router-link></li>
                    <a href="" class="text-white hover-effect">
                        <li v-if="loginInfo != null" @click="logout">로그아웃</li>
                        <li v-else @click="login">로그인</li>
                    </a>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
    data() {
        return {
            loginInfo: JSON.parse(localStorage.getItem('loginInfo'))
        }
    },
    methods: {
        logout() {
            axios.get('/users/logout')
                .then(
                    alert('로그아웃'),
                    localStorage.removeItem('loginInfo'),
                    this.$router.push('/')
                )
                .catch(error => { alert(error.response.data.message) })
        },
        login() {
            this.$router.push('/login')
        }
    },
}
</script>

<style scoped>
.app {
    background-color: #f4f6f8;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

body {
    font-family: "TmoneyRoundWindRegular", "TmoneyRoundWindExtraBold";
    display: block;
    margin: 0;
}

header {
    background-color: #454558;
    color: #000;
    box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.2);
    height: 90px;
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    max-width: 800px;
    margin: 0 auto;
    height: inherit;
}

.logo {
    font-size: 40px;
    text-decoration: none;
}

.hover-effect:hover {
    opacity: 0.8;
}

nav ul {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
}

nav li {
    margin: 0 10px;
}

nav a {
    color: #000;
    text-decoration: none;
}

</style>