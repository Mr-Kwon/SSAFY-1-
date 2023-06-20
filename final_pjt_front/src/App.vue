<template>
  <div id="app">
    <nav class="navbar">
      <div class="container-fluid nav-div">
          <router-link :to="{name:'HomeView'}" style="color: #3395f4;">
            <img src="@/assets/YEMINLOGO.png" style="width: 130px; border-radius: 0px" alt="">
          </router-link>

          <router-link :to="{name:'MovieView', params:{page:1}}">영화 목록</router-link>
          <div v-if="isLogin">
            <router-link :to="{name:'MyContentView'}">내 컨텐츠</router-link>
            <router-link :to="{name:'ArticleView'}">커뮤니티</router-link>
            <router-link :to="{name:'RecommendView'}">영화 추천</router-link>
          </div>


          <SearchForm/>
          <div v-if="isLogin" class="d-flex">
            <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ username }}
            </a>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="http://localhost:8080/profile">나의 프로필</a></li>
                <li><a class="dropdown-item" href="http://localhost:8080/updateprofile">프로필 변경</a></li>
            </ul>
            </div>
            <a @click="logout">로그아웃</a>


          </div>
          <div v-else class="d-flex">
            <router-link :to="{name:'SignUpView'}">회원가입</router-link>
            <router-link :to="{name:'LoginView'}">로그인</router-link>
          </div>


      </div>
    </nav>
    
    <router-view/>
  </div>
</template>

<script>
import SearchForm from '@/components/SearchForm.vue'
export default {
  name: 'App',
  components: {
    SearchForm
  },
  computed:{
    isLogin(){
      return this.$store.getters.isLogin
    },
    username(){
      return this.$store.state.username
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&family=Roboto:ital,wght@0,300;0,400;0,500;0,900;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400;500;700;900&family=Poppins:wght@500;700;900&display=swap');
#app {
  font-family: 'Noto Sans KR', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: whitesmoke;
}

#app > nav {
  color: #d4d7db;
  background-color: #141517;
  padding: 0;
}

.nav-div{
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
  padding-bottom: 0px;
}

nav a {
  font-weight: 500;
  color: #d4d7db;
  text-decoration: none;
  margin: 20px;
  height: 100%;
  white-space: nowrap;
  font-size: 17px;
}

nav a.router-link-exact-active {
  color: #3571b4;
}

body {
  background-color: #000000;
}

.dropdown-menu{
  width: 100px;

}

.dropdown-item{
  text-align: center;
  padding: 10px 0 10px 0;
  margin: 0;
}


.dropdown-item:hover{
  width: 100%;
  margin: 0;
  padding: 10px 0 10px 0;
}
</style>


