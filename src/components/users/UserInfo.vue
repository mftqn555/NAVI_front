<template>
    <main class="wrap_main">
        <div class="my-container">
            <div class="box">
                <div class="box_content">
                    <h1>회원정보 수정</h1>
                    <div class="">
                        <form class="needs-validation">
                            <div class="my-3">
                                <h5>이메일 주소</h5>
                                <span>{{ email }}</span>
                            </div>
                            <div class="my-3">
                                <h5>닉네임</h5>
                                <span>{{ nickname }}</span>
                            </div>
                            <button @click="goNicknameModifyPage" type="button" class="btn btn-secondary mx-1">닉네임
                                변경</button>
                            <button @click="goPasswordModifyPage" type="button" class="btn btn-secondary mx-1">비밀번호
                                변경</button>
                            <button @click="goDeleteUserPage" type="button" class="btn btn-danger mx-1">회원탈퇴</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            email: JSON.parse(localStorage.getItem('loginInfo')).email,
            nickname: JSON.parse(localStorage.getItem('loginInfo')).nickname,
        }
    },
    methods: {
        goNicknameModifyPage() {
            this.$router.push('/nicknameModify')
        },
        goPasswordModifyPage() {
            this.$router.push('/passwordModify')
        },
        goDeleteUserPage() {
            this.$router.push('/deleteUser')
        }
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

footer {
    padding: 10px;
    background-color: #f4f6f8;
    color: #000;
    text-align: center;
    box-shadow: 0px -1px 0px rgba(0, 0, 0, 0.2);
}</style>