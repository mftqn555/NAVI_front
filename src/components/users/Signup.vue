<template>
    <main class="wrap_main">
        <div class="my-container">
            <div class="box">
                <div class="box_content">
                    <h1>회원가입</h1>
                    <div class="">
                        <form class="needs-validation">
                            <div class="my-3">
                                <label for="validationCustom01" class="form-label">이메일 주소</label>
                                <input v-model="inputEmail" type="email" class="form-control" id="email" name="email"
                                    required>
                                <button @click="findExistEmail"
                                    :class="[isEmailUnique === null ? '' : isEmailUnique ? 'is-valid' : 'is-invalid']"
                                    class="btn btn-secondary my-2" id="validationCustom01" type="button">중복 체크</button>
                                <div class="invalid-feedback">
                                    {{ uniqueEmailMessage }}
                                </div>
                                <div class="valid-feedback">
                                    사용할 수 있는 이메일입니다
                                </div>
                            </div>
                            <div class="my-3">
                                <label for="password" class="form-label">비밀번호</label>
                                <input v-model="password" type="password" class="form-control" id="password" name="password"
                                    required>
                            </div>
                            <div class="my-3">
                                <label for="password-confirm" class="form-label">비밀번호 확인</label>
                                <input v-model="confirmPassword" type="password" class="form-control password-confirm"
                                    id="password-confirm"
                                    :class="[isSamePassword === null ? '' : isSamePassword ? 'is-valid' : 'is-invalid']"
                                    name="password-confirm" required>
                                <div class="invalid-feedback">
                                    {{ passwordMessage }}
                                </div>
                                <div class="valid-feedback">
                                    {{ passwordMessage }}
                                </div>
                            </div>
                            <div class="my-3">
                                <label for="nickname" class="form-label">닉네임</label>
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
                            <button @click="signup" type="button" class="btn btn-primary">회원가입</button>
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
            inputEmil: '',
            isEmailUnique: null,
            uniqueEmailMessage: '',
            isSamePassword: null,
            password: '',
            confirmPassword: '',
            inputNickname: '',
            isNicknameUniuqe: null,
            uniqueNicknameMessage: '',
        }
    },
    methods: {
        findExistEmail() {
            axios.get('/users/exist', {
                params: {
                    email: this.inputEmail
                }
            })
                .then(response => {
                    this.isEmailUnique = response.data.unique
                    if (this.isEmailUnique == true) {
                        this.uniqueEmailMessage = '사용 가능한 이메일입니다'
                    } else {
                        this.uniqueEmailMessage = '이미 사용중인 이메일입니다'
                    }
                })
                .catch(error => {
                    this.isEmailUnique = false
                    this.uniqueEmailMessage = error.response.data.message
                })
        },
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
        signup() {
            if (this.isEmailUnique == true && this.isSamePassword == true && this.isNicknameUniuqe == true) {
                const signupData =
                {
                    email: this.inputEmail,
                    password: this.password,
                    nickname: this.inputNickname
                }
                axios.post('/users/signup', JSON.stringify(signupData), { headers: { "Content-Type": `application/json` } })
                    .then(() => {
                        alert('회원가입을 축하드립니다')
                        this.$router.push('/login')
                    }
                    )
                    .catch(error => {
                        console.log(error)
                        alert(error.response.data.message)
                    })
            } else {
                alert('중복체크 혹은 올바른 값을 입력했는지 확인해주세요')
            }
        }

    },
    computed: {
        passwordMessage() {
            const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
            if (!regex.test(this.password) && this.password != "") {
                this.isSamePassword = false;
                return '비밀번호는 숫자, 알파벳이 포함된 6자이상이여야합니다'
            }
            if (this.password != this.confirmPassword) {
                this.isSamePassword = false;
                return '비밀번호가 일치하지 않습니다';
            }
            if (this.password == this.confirmPassword && this.password != "" && regex.test(this.password)) {
                this.isSamePassword = true;
                return '비밀번호가 일치합니다';
            }
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
    height: 670px;
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