<template>
    <main class="wrap_main">
        <div class="my-container">
            <div class="box">
                <div class="box_content">
                    <h1>비밀번호 변경</h1>
                    <div class="">
                        <form class="needs-validation">
                            <div class="my-3">
                                <label for="password" class="form-label">현재 비밀번호</label>
                                <input v-model="oldPassword" type="password" class="form-control" id="password" name="password"
                                    required>
                            </div>
                            <div class="my-3">
                                <label for="password" class="form-label">비밀번호</label>
                                <input v-model="newPassword" type="password" class="form-control" id="password" name="password"
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
                            <button @click="changePassword" type="button" class="btn btn-success">변경하기</button>
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
            email: JSON.parse(localStorage.getItem('loginInfo')).email,
            isSamePassword: null,
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        }
    },
    methods: {
        changePassword() {
            if (this.isSamePassword == true) {
                const passwordData =
                {
                    email: this.email,
                    oldPassword: this.oldPassword,
                    newPassword: this.newPassword,
                }
                axios.patch('/users/password', JSON.stringify(passwordData), { headers: { "Content-Type": `application/json` } })
                    .then((response) => {
                            console.log(this.email)
                            alert('비밀번호가 변경되었습니다')
                            this.$router.push('/')
                        }
                    )
                    .catch(error => {
                        alert(error.response.data.message)
                    })
            } else {
                alert('올바른 값을 입력했는지 확인해주세요')
            }
        }

    },
    computed: {
        passwordMessage() {
            const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
            if (!regex.test(this.newPassword) && this.newPassword != "") {
                this.isSamePassword = false;
                return '비밀번호는 숫자, 알파벳이 포함된 6자이상이여야합니다'
            }
            if (this.newPassword != this.confirmPassword) {
                this.isSamePassword = false;
                return '비밀번호가 일치하지 않습니다';
            }
            if (this.newPassword == this.confirmPassword && this.newPassword != "" && regex.test(this.newPassword)) {
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