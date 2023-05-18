<template>
    <main class="wrap_main">
        <div class="container">
            <div class="box">
                <div class="box_content">
                    <div class="login-box">
                        <h2 class="text-center">로그인</h2>
                        <form>
                            <div class="my-2">
                                <label for="validationCustom01" class="form-label">이메일</label>
                                <input v-model="inputEmail" type="text" class="form-control" id="validationCustom01"
                                    required>
                            </div>
                            <div class="my-2">
                                <label for="validationCustom01" class="form-label">비밀번호</label>
                                <input v-model="inputPassword" type="password" class="form-control" id="validationCustom01"
                                    required>
                            </div>
                            <div class="d-grid gap-2">
                                <button @click="login" class="btn btn-primary" type="button">로그인</button>
                                <div class="btn-group" role="group">
                                    <button @click="goSignUPPage" class="btn btn-light" type="button">회원가입</button>
                                    <button @click="userInfo" class="btn btn-light" type="button">회원정보 찾기</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import router from '@/router';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {

    data() {
        return {
            inputEmail: '',
            inputPassword: '',
        }
    },
    methods: {
        login() {
            const loginData = { email: this.inputEmail, password: this.inputPassword }

            axios.post('/users/login', JSON.stringify(loginData),
                {
                    headers: {
                        "Content-Type": `application/json`,
                    }
                })
                .then(response => {
                    alert('로그인 성공')
                    let now = new Date().getTime();
                    const loginInfo =
                    {
                        "id": response.data.id,
                        "email": response.data.email,
                        "nickname": response.data.nickname,
                        "expire": now + 60 * 60 * 24 * 1000
                    }
                    localStorage.setItem('loginInfo', JSON.stringify(loginInfo))
                    router.go(0)
                })
                .catch(error => { alert('로그인에 실패하였습니다') })
        },
        userInfo() {
            this.$router.push('/findUser')
        },
        goSignUPPage() {
            this.$router.push('/signup')
        },
    }
}
</script>

<style scoped>
body {
    font-family: "TmoneyRoundWindRegular", "TmoneyRoundWindExtraBold";
    display: block;
    margin: 0;
}

header {
    background-color: #fff;
    color: #000;
    box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.2);
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

.wrap_main {
    flex: 1;
    margin: 0 10px 0 10px;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    max-width: fit-content;
    margin: 6% auto;
}

.box {
    position: relative;
    background-color: #fff;
    padding: 15px;
    width: 100%;
    height: 500px;
    max-width: 600px;
}

footer {
    padding: 10px;
    background-color: #f4f6f8;
    color: #000;
    text-align: center;
    box-shadow: 0px -1px 0px rgba(0, 0, 0, 0.2);
}

/* CSS Code */
.login-box {
    width: 400px;
    margin: 6% auto;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
}

.login-box h2 {
    margin-top: 0;
}

.login-box form {
    display: flex;
    flex-direction: column;
}

.login-box label {
    display: block;
    font-weight: bold;
    text-align: left;
}

.login-box input {
    border: 1px solid #ccc;
    border-radius: 4px;
}

.form-control.no-validate:valid {
    border-color: #ced4da;
    padding-right: .75rem;
    background: none;
}

@media (max-width: 576px) {
    .container {
        max-width: -webkit-fill-available;
    }

    .login-box {
        width: 100%;
    }
}
</style>