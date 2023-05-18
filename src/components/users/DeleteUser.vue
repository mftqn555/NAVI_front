<template>
    <main class="wrap_main">
        <div class="my-container">
            <div class="box">
                <div class="box_content">
                    <h1>회원탈퇴</h1>
                    <p style="color: red;">회원탈퇴시 삭제되는 정보는 복구가 불가능합니다</p>
                    <div class="">
                        <form class="needs-validation">
                            <div class="my-3">
                                <label for="password" class="form-label">현재 비밀번호</label>
                                <input v-model="password" type="password" class="form-control" id="password" name="password"
                                    required>
                            </div>
                            <button @click="confirm" type="button" class="btn btn-danger">탈퇴하기</button>
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
            password: '',
        }
    },
    methods: {
        deleteUser() {
            axios.delete('/users',
                {
                    headers: { "Content-Type": `application/json` },
                    data: {
                        email: this.email,
                        password: this.password,
                    }
                })
                .then((response) => {
                    alert('정상적으로 탈퇴되었습니다')
                    this.$router.push('/')
                }
                )
                .catch(error => {
                    alert(error.response.data.message)
                })

        },
        confirm() {
            if (!confirm("회원탈퇴를 하시겠습니까?")) {
                alert('취소되었습니다')
            } else {
                this.deleteUser()
            }
        }
    }
}
</script>

<style scoped>
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