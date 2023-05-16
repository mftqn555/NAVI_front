<template>
    <main class="wrap_main">
        <div class="my-container">
            <div class="box">
                <div class="box_content">
                    <h1>닉네임변경</h1>
                    <div class="">
                        <form class="needs-validation">
                            <div class="my-3">
                                <p>현재 닉네임</p>
                                {{ nickname }} <br><br>
                                <label for="nickname" class="form-label">변경할 닉네임</label>
                                <input v-model="inputNickname" type="text" class="form-control" id="nickname"
                                    name="nickname"
                                    :class="[isNicknameUniuqe === null ? '' : isNicknameUniuqe ? 'is-valid' : 'is-invalid']"
                                    required>
                                <button @click="findExistNickname" class="btn btn-secondary my-1"
                                    type="button">중복체크</button>
                                <div class="invalid-feedback">
                                    {{ uniqueNicknameMessage }}
                                </div>
                                <div class="valid-feedback">
                                    {{ uniqueNicknameMessage }}
                                </div>
                            </div>
                            <button @click="nicknameSubmit" class="btn btn-success" type="button">변경하기</button>
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
            inputNickname: '',
            isNicknameUniuqe: null,
            uniqueNicknameMessage: '',
            email: JSON.parse(localStorage.getItem('loginInfo')).email,
            nickname: JSON.parse(localStorage.getItem('loginInfo')).nickname,
        }
    },
    methods: {
        findExistNickname() {
            axios.get('/users/exist', {
                params: {
                    nickname: this.inputNickname
                }
            })
                .then(response => {
                    this.isNicknameUniuqe = response.data.unique
                    if (this.isNicknameUniuqe == true) {
                        this.uniqueNicknameMessage = '사용 가능한 닉네임입니다'
                    } else {
                        this.uniqueNicknameMessage = '이미 사용중인 닉네임입니다'
                    }
                })
                .catch(error => {
                    this.isNicknameUniuqe = false
                    this.uniqueNicknameMessage = error.response.data.message
                })
        },
        nicknameSubmit() {
            if (this.isNicknameUniuqe == true) {
                const nicknameData =
                {
                    email: this.email,
                    nickname: this.inputNickname,
                }
                axios.patch('/users/nickname', JSON.stringify(nicknameData), { headers: { "Content-Type": `application/json` } })
                    .then(() => {
                        alert('닉네임이 변경되었습니다')
                        const data = JSON.parse(localStorage.getItem('loginInfo'));
                        data.nickname = this.inputNickname
                        console.log(data.nickname)
                        console.log(JSON.stringify(data));
                        localStorage.setItem('loginInfo', JSON.stringify(data))
                        this.$router.push('/')
                    }
                    )
                    .catch(error => {
                        alert(error.response.data.message)
                    })
            } else {
                alert('중복체크 혹은 올바른 값을 입력했는지 확인해주세요')
            }
        },
        logout() {
            axios.get('/users/logout')
                .then(
                    localStorage.removeItem('loginInfo'),
                    this.$router.push('/')
                )
                .catch(error => { alert(error.response.data.message) })
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

/* Container styles */
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

.box_title {
    margin: 0;
    font-size: 25px;
    width: 80px;
    white-space: nowrap;
    font-weight: bold;
    width: 80px;
    padding: 10px 0px;
}

.box-text {
    margin: 0;
    font-size: 16px;
}

.box-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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

.login-btn {
    padding: 0.5rem 1rem;
    background-color: #4285f4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
}

.login-btn:hover {
    background-color: #3367d6;
}

.gray-btn {
    padding: 0.5rem 1rem;
    background-color: #ccc;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: not-allowed;
    margin-top: 1rem;
}

.form-control.no-validate:valid {
    border-color: #ced4da;
    padding-right: .75rem;
    background: none;
}
</style>