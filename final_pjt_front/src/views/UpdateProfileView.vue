<template>
  <div>
    <h1 class="text-start" style="margin-top:30px">회원정보 변경</h1>
    <div class="d-flex justify-content-center align-items-center" style="margin-top:60px; color:black;" >
          <div class="sign-up-box">
          <form @submit.prevent="updateProfile" style="text-align:start;">
        <p>닉네임</p>
        <div class="input-box">
          <input  type="text" v-model="nickname">
        </div>
        
        <p>이메일</p>
        <div class="input-box">
          <input  type="email" v-model="email">
        </div>  
        
        <p>비밀번호</p>
        <div class="input-box">
          <input  type="password" v-model="password1">
        </div>
        
        <p>비밀번호 확인</p>
        <div class="input-box">
          <input  type="password" v-model="password2">
        </div>

        <button class="btn btn-primary">변경</button>
    </form>

    </div>
    </div>


  </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
export default {
    name : 'UpdateProfileView',
    data(){
      return{
        password1: null,
        password2: null,
        email: null,
        nickname: null,
      }
    },
    // computed : {
    //   originUserProfile(){
    //     return this.$store.state.userProfile
    //   }
    // },  
    created(){
      this.getUserProfile()
    },
    methods: {
      getUserProfile(){
            this.$store.dispatch('getUserProfile')
            const userProfile = this.$store.state.userProfile
            this.email = userProfile.email
            this.nickname = userProfile.nickname
      },
      updateProfile(){
        if(this.password1!= this.password2){
          Swal.fire({
            icon:'error',
            title:'비밀번호가 일치하지 않습니다',
            confirmButtonText: '확인'
          })
          return
        }
        if(!this.password1){
          Swal.fire({
            icon:'error',
            title:'패스워드를 입력해주세요',
            confirmButtonText: '확인'
          })
          return
        }
        if(!this.password2){
          Swal.fire({
            icon:'error',
            title:'패스워드 확인을 입력해주세요',
            confirmButtonText: '확인'
          })
          return
        }
        if(!this.nickname){
          Swal.fire({
            icon:'error',
            title:'닉네임을 입력해주세요',
            confirmButtonText: '확인'
          })
          return
        }
        const nickname = this.nickname
        const password1 = this.password1
        const password2 = this.password2
        const email = this.email
        const payload = {
          nickname, email, password1,password2
        }
        this.$store.dispatch('updateProfile', payload)
          .then(() => {
            this.$router.push({ name : 'ProfileView' })
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
}
</script>

<style>

</style>