<template>
    <main class="wrap_main">
        <div class="my-container">
            <div class="box">
                <div class="box_content">
                    <h1>회원정보 찾기</h1>
                    <div class="">
                        <form class="">
                            <div class="my-3">
                                <div>가입하셨을 때 등록한 이메일 주소를 입력하시면<br>비밀번호 정보를 메일로 발송해드립니다</div><br>
                                <label for="email" class="form-label">이메일 주소</label>
                                <input v-model="inputEmail" type="email" class="form-control" id="email" name="email"
                                    required>
                                <div class="text-muted">이메일 전송에는 30초에서 1분정도 소요될 수 있습니다</div>
                            </div>
                            <button @click="findPassword" type="button" class="btn btn-primary">이메일 전송</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            inputEmail: '',
        }
    },
    methods: {
        findPassword() {
            axios.get('/users/email', {
                params: {
                    email: this.inputEmail
                }
            })
                .then(
                    alert('이메일이 전송되었습니다')
                )
                .catch(error => {
                    alert(this.emailMessage = error.response.data.message);
                })
        },
    },
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

.my-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    max-width: 1200px;
    margin: 2% auto;
}

.box {
    position: relative;
    background-color: #fff;
    padding: 15px;
    width: 100%;
    max-width: 600px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

footer {
    padding: 10px;
    background-color: #f4f6f8;
    color: #000;
    text-align: center;
    box-shadow: 0px -1px 0px rgba(0, 0, 0, 0.2);
}

.form-control.no-validate:valid {
    border-color: #ced4da;
    padding-right: .75rem;
    background: none;
}
</style>