<template>
  <div class="sign-up-page" style="margin-top: 60px;">
    <a href="http://localhost:8080/"><img src="@/assets/YEMINLOGO.png" style="width: 150px; border-radius: 0; margin-bottom: 20px;" alt=""></a>
    <div class="sign-up-box">
        <div>회원가입</div>
        <form @submit.prevent="signUp" style="text-align: start;">
            <div>
                <label>아이디 </label>
            </div>
            <div class="input-box">
                <input type="text" v-model="username" placeholder="아이디를 입력해주세요">
            </div>
            <div>
                <label>닉네임 </label>
            </div>
            <div class="input-box">
                <input type="text" v-model="nickname" placeholder="닉네임을 입력해주세요">
            </div>

            <div>
                <label>이메일 </label>
            </div>
            <div class="input-box">
                <input type="email" v-model="email" placeholder="example@gmail.com" autocomplete="email" autocapitalize="none" spellcheck="false">
            </div>

            <div>
                <label>비밀번호 </label>
            </div>
            <div class="input-box">
                <input type="password" v-model="password1" placeholder="비밀번호를 입력해주세요" autocapitalize="off" spellcheck="false">
            </div>
            <div>
                <label>비밀번호 확인 </label>
            </div>
            <div class="input-box">
                <input type="password" v-model="password2" placeholder="비밀번호를 다시 입력해주세요" autocapitalize="off" spellcheck="false">
            </div>
             <button class="btn btn-primary">확인</button>
           

        </form>

    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
export default {
    name: 'SignUpView',
    data(){
        return {
            username: null,
            nickname: null,
            email: null,
            password1: null,
            password2: null,
        }
    },
    methods: {
        signUp(){

            const username = this.username
            const nickname = this.nickname
            const email = this.email
            const password1 = this.password1
            const password2 = this.password2
            if(!username){
                 Swal.fire({
                    icon: 'error',
                    title: '유저네임을 입력해주세요',
                    confirmButtonText: '확인'
                })
                return
            }else if(!nickname){
                 Swal.fire({
                    icon: 'error',
                    title: '닉네임을 입력해주세요',
                    confirmButtonText: '확인'
                })
                return
            }else if(!email){
                 Swal.fire({
                    icon: 'error',
                    title: '이메일을 입력해주세요',
                    confirmButtonText: '확인'
                })
                return
            }else if(!password1){
                 Swal.fire({
                    icon: 'error',
                    title: '비밀번호를 입력해주세요',
                    confirmButtonText: '확인'
                })
                return
            }else if(!password2){
                 Swal.fire({
                    icon: 'error',
                    title: '비밀번호 확인을 입력해주세요',
                    confirmButtonText: '확인'
                })
                return
            }else if (password1!=password2){
                    Swal.fire({
                    icon: 'error',
                    title: '비밀번호가 일치하지 않습니다.',
                    confirmButtonText: '확인'
                })
                return
            }
            const payload = {
                username, nickname, email, password1, password2
            }
            this.$store.dispatch('signUp',payload)
        }
    }
}
</script>

<style>
.sign-up-page{
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
.sign-up-box{
    background-color: white;
    padding: 2rem;
    border: 1px solid lightgray;
    width: 386px;
    border-radius: 0.25rem;
}
input{
    border: none;
    outline: none;
    caret-color: #3395f4;
}

.input-box{
    display: flex;
    margin-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid lightgray;
    margin-bottom: 1.5rem;
}

</style>