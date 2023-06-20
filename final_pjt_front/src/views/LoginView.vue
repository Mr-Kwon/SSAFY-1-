<template>
  <div class="login-page" style="margin-top:60px;" >
    <a href="http://localhost:8080/">
    <img src="@/assets/YEMINLOGO.png" style="width: 150px; border-radius: 0; margin-bottom: 20px;" alt="">
    </a>
    <div class="login-box">
        <form @submit.prevent="login">
            <div>
                <label>아이디</label>
            </div>
            <div class="input-box">
                <input name="username" type="text" v-model="username" autocapitalize="none" spellcheck="false">
            </div>
            <div>
                <label>비밀번호</label>
            </div>
            <div class="input-box">
                <input name="password" v-model="password" type="password" autocapitalize="off">
            </div>
            <button class="btn btn-primary">확인</button>
        </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
export default {
    name:'LoginView',
    data(){
        return {
            username: null,
            password: null,
        }
    },
    methods: {
        login(){

            const username = this.username
            const password = this.password
            if(!username){
                    Swal.fire({
                    icon: 'error',
                    title: '유저네임을 입력해주세요',
                    confirmButtonText: '확인'
                })
                return
            }else if(!password){
                Swal.fire({
                    icon: 'error',
                    title: '비밀번호를 입력해주세요',
                    confirmButtonText: '확인'
                })
                return
            }
            const payload = {
                username, password
            }
            this.$store.dispatch('login', payload)
              .then(response => {
                console.log(response)
              })
              .catch(error => {
                console.log(error)
              })
        }
    }
}
</script>

<style>
.login-page {
    padding-top: 2rem;
    padding-bottom: 2rem;
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-box-align: center;
    flex-direction: column;
    color: rgb(61, 61, 61);
}
.login-box {
    background-color: white;
    padding: 2rem;
    border: 1px solid lightgray;
    width: 386px;
    border-radius: 0.25rem;
    text-align: start;
}

.input-box {
    display: flex;
    margin-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid lightgray;
    margin-bottom: 1.5rem;
}
</style>
