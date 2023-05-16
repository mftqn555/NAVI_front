import { createRouter, createWebHistory } from "vue-router";
import MainContent from "../components/main/MainContent.vue";
import BoardList from "../components/board/BoardList.vue"
import Board from "../components/board/Board.vue"
import Signup from "../components/users/Signup.vue"
import Login from "../components/users/Login.vue"
import UserInfo from "../components/users/UserInfo.vue"
import NicknameModify from "../components/users/NicknameModify.vue"
import PasswordModify from "../components/users/PasswordModify.vue"
import DeleteUser from "../components/users/DeleteUser.vue"
import FindUserInfo from "../components/users/FindUserInfo.vue"
import BoardWrite from "../components/board/BoardWrite.vue"
import BoardUpdate from "../components/board/BoardUpdate.vue"
import axios from "axios";
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

const updateLoaclStorageExpire = () => {
    const storageValue = localStorage.getItem("loginInfo");
    const storageObject = JSON.parse(storageValue);
    storageObject.expire = new Date().getTime() + 60 * 60 * 24 * 1000;
    const updatedStorageValue = JSON.stringify(storageObject);
    localStorage.setItem("loginInfo", updatedStorageValue);
}

const loginCheck = (next) => {
    console.log("LOGIN CHECK 실행")
    axios.get(`/users/check`)
    .then((response) => {
        updateLoaclStorageExpire()
        next()
    })
    .catch(error => {
        alert('로그인 하세요')
        axios.get('/users/logout')
            .then(
                localStorage.removeItem('loginInfo'),
                router.go(0),
            )
            .catch(error => { alert(error.response.data.message) })
    })
}

const routes = [
    {
        path: "/boardWrite",
        name: "BoardWrite",
        component: BoardWrite,
        beforeEnter: (to, from, next) => {
            loginCheck(next)
        }
    },
    {
        path: "/findUser",
        name: "FindUser",
        component: FindUserInfo,
        beforeEnter: (to, from, next) => {
            loginCheck(next)
        }
    },
    {
        path: "/boardUpdate",
        name: "BoardUpdate",
        component: BoardUpdate,
        beforeEnter: (to, from, next) => {
            loginCheck(next)
        }
    },
    {
        path: "/deleteUser",
        name: "DeleteUser",
        component: DeleteUser,
        beforeEnter: (to, from, next) => {
            loginCheck(next)
        }
    },
    {
        path: "/passwordModify",
        name: "PasswordModify",
        component: PasswordModify,
        beforeEnter: (to, from, next) => {
            loginCheck(next)
        }
    },
    {
        path: "/nicknameModify",
        name: "NicknameModify",
        component: NicknameModify,
        beforeEnter: (to, from, next) => {
            loginCheck(next)
        }
    },
    {
        path: "/info",
        name: "Info",
        component: UserInfo,
        beforeEnter: (to, from, next) => {
            loginCheck(next)
        }
    },
    {
        path: "/boards",
        name: "Boards",
        component: BoardList,
    },
    {
        path: "/board/:bno",
        name: "Board",
        component: Board,
    },
    {
        path: "/signup",
        name: "Signup",
        component: Signup,
    },
    {
        path: "/",
        name: "MainContent",
        component: MainContent,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('loginInfo') != null) {
                next('/')
            }
            else {
                next()
            }
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from) => {
    let expireDate = null
    const nowDate = new Date()
    if (localStorage.getItem('loginInfo') != null) {
        expireDate = JSON.parse(localStorage.getItem('loginInfo')).expire
        if (expireDate < nowDate) {
            localStorage.removeItem('loginInfo'),
                alert('로그인 정보가 만료되어 로그아웃 되었습니다')
            router.go(0)
        }
    }
    return true
})

export default router;