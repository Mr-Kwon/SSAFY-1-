import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import createPersistedState from 'vuex-persistedstate'
import Swal from 'sweetalert2/dist/sweetalert2.js'
Vue.use(Vuex)


const API_URL = 'http://127.0.0.1:8000'
export default new Vuex.Store({
  plugins:[
    createPersistedState()
  ],
  state: {
    movies : [],
    token : null,
    likeMovie: [],
    wishMovie: [],
    username: null,
    userProfile : {},
    currentUser: {},
    myLikeMovieList : [],
    myWishMovieList : [],
    
    //
    articleList : [],
    commentList : [],
    reviewList : [],
    detailMovie : {},

  },
  getters: {
    isLogin(state){
      return state.token ? true : false
    },
    authHeader(state){
      return ({ Authorization: `Token ${state.token}` })
    },
    computedarticleList(state){
      return state.articleList
    },
    computedCommentList(state){
      return state.commentList
    },
    computedReviewList(state){
      return state.reviewList
    },
    computedDetailMovie(state){
      return state.detailMovie
    },
    computedWishMovie(state){
      return state.wishMovie
    },
    computedLikeMovie(state){
      return state.likeMovie
    },
    computedLikeMovieList(state){
      return state.myLikeMovieList
    },
    computedWishMovieList(state){
      return state.myWishMovieList
    }


  },
  mutations: {
    SAVE_TOKEN(state, token){
      state.token = token
      router.push({name:'MovieView'})
    },
    LIKE_MOVIE(state, payload){
      if(!state.likeMovie) {
        state.likeMovie = [] // 배열로 초기화
      }else{
        if(payload.liked){
          state.likeMovie.push(payload.movieId)
        }else{
          for(let i=0; i<state.likeMovie.length; i++){
            if(state.likeMovie[i]===payload.movieId){
              state.likeMovie.splice(i,1)
              i--
            }
          }
        }
      }

    },
    WISH_MOVIE(state,payload){
      if(!state.wishMovie) {
        state.wishMovie = [] // 배열로 초기화
      }else{
        if(payload.wished){
          state.wishMovie.push(payload.movieId)
        }else{
          for(let i=0; i<state.wishMovie.length; i++){
            if(state.wishMovie[i]===payload.movieId){
              state.wishMovie.splice(i,1)
              i--
            }
          }
        }
      }
    },
    SAVE_USERNAME(state,username){
      state.username = username
    },
    GET_USER_PROFILE(state, userInfo){
      state.userProfile = userInfo
    },
    REMOVE_TOKEN(state){
      state.token = null
      state.username = null
    },
    UPDATE_PROFILE(state,userInfo){
      state.currentUser = userInfo
    },
    GET_USER_MOVIE_LIST(state,movieList){
      state.personalMovieList = movieList
    },
    GET_ARTICLELIST(state, articleList){
      state.articleList = articleList
    },
    GET_COMMENT_LIST(state,comments){
      state.commentList = comments
    },
    GET_REVIEW_LIST(state,reviews){
      state.reviewList = reviews
    },
    GET_DETAIL_MOVIE(state,movie){
      state.detailMovie = movie
    },
    GET_MY_Like_MOVIELIST(state,movies){
      state.myLikeMovieList = movies
    },
    GET_MY_WISH_MOVIELIST(state,movies){
      state.myWishMovieList = movies
    }
  },
  actions: {

    signUp(context, payload) {
      const username = payload.username
      const nickname = payload.nickname
      const email = payload.email
      const password1 = payload.password1
      const password2 = payload.password2
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username, nickname, email, password1, password2
        }
      })
        .then((response) => {
          const { success, access } = response.data // 토큰 정보 받아옴
          context.commit('SAVE_TOKEN', access) // 토큰 저장
          console.log(success)
        })
        .catch((err) => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: '이미 있는 닉네임입니다.',
            confirmButtonText: '확인'
        })
        })
    },
    login(context, payload) {
      const username = payload.username
      const password = payload.password
    
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username, password
        }
      })
        .then((response) => {
          // console.log(response)
          const data1 = JSON.parse(response.config.data)
          // const { success, access } = response.data // 토큰 정보 받아옴
          context.commit('SAVE_TOKEN', response.data.key) // 토큰 저장
          context.commit('SAVE_USERNAME', data1.username)
          // console.log(response.data.key)
        })
        .catch((err) => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: '유저네임 혹은 비밀번호를 잘못 입력하셨습니다.',
            confirmButtonText: '확인'
        })
        })
    },
    updateProfile(context,payload){
      const nickname = payload.nickname
      const email = payload.email
      const password1 = payload.password1
      const password2 = payload.password2
      axios({
        method: 'put',
        url: `${API_URL}/accounts/profile/update/`,
        data : {
          nickname,email,password1,password2
        },
        headers:{
          Authorization : `Token ${this.state.token}`
        }
      })
      .then((response)=>{
        console.log(response)
        context.commit('UPDATE_PROFILE',response.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    likeMovie(context,movieId){
      console.log(context.getters.authHeader)
      axios({
        method:'post',
        url: `${API_URL}/movies/${movieId}/likes/`,
        headers:{
          Authorization : `Token ${this.state.token}`
        }
      })
      .then((response)=>{
        // console.log(response.data)
        const payload = {movieId:movieId, liked:response.data.liked}
        context.commit('LIKE_MOVIE', payload)
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    wishMovie(context,movieId){
      console.log(context.getters.authHeader)
      axios({
        method: 'post',
        url: `${API_URL}/movies/${movieId}/wish/`,
        headers: {
          Authorization : `Token ${this.state.token}`
        }
      })
      .then((response)=>{
        // console.log(response.data.wished)
        const payload = {movieId:movieId, wished:response.data.wished}
        context.commit('WISH_MOVIE', payload)
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    getUserProfile(context){
      axios({
        method: 'get',
        url: `${API_URL}/accounts/profile/${context.state.username}/`,
        headers:{
          Authorization : `Token ${this.state.token}`
        }
      })
      .then((response)=>{
        // console.log(response.data)
        context.commit('GET_USER_PROFILE', response.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    logout(context) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/logout/`,
        headers : {
          Authorization : `Token ${this.state.token}`
        }
      })
      .then(() => {
        context.commit('REMOVE_TOKEN')
        localStorage.removeItem('vuex')
        router.push({ name: 'HomeView' })
      })
      .catch((error) => {
        console.log(error)
      })
    },
    getUserMovieList(context){
      axios({
        url: `${API_URL}/accounts/movie_list/${this.state.username}/`,
        headers : {
          Authorization : `Token ${this.state.token}`
        } 
      })
      .then((response)=>{
        context.commit('GET_USER_MOVIE_LIST', response.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    getReviewList(context,movieId){
      axios({
        url: `${API_URL}/movies/${movieId}/reviews/`,
        headers : {
          Authorization : `Token ${this.state.token}`
        }
      })
      .then((response)=>{
        context.commit('GET_REVIEW_LIST', response.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    deleteReview(context,payload){
      const reviewId = payload.reviewId
      const movieId = payload.movieId
      axios({
        method: 'delete',
        url: `${API_URL}/movies/reviews/${reviewId}/`,
        headers : {
          Authorization : `Token ${this.state.token}`
        }
      })
      .then(()=>{
        context.dispatch('getReviewList', movieId)
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    getDetailMovie(context,movieId){
      axios({
        url: `http://127.0.0.1:8000/movies/d=${movieId}/`,
        headers: {
                    Authorization: `Token ${this.state.token}`
                },

      })
      .then((response)=>{
        console.log(response.data)
        context.commit('GET_DETAIL_MOVIE', response.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    myContentList(context){
      axios({
        url:`${API_URL}/accounts/mycontents/`,
        headers : {
          Authorization : `Token ${this.state.token}`
        }
      })
      .then((response)=>{
        // console.log(response.data.like_movies)
        context.commit('GET_MY_Like_MOVIELIST', response.data.like_movies)
        context.commit('GET_MY_WISH_MOVIELIST', response.data.wish_movies)
      })
      .catch((err)=>{
        console.log(err)
      })
    },

    ////////////////아티클
    getArticleList(context){
      axios({
        method: 'get',
        url: `${API_URL}/articles/`,
        headers : {
          Authorization : `Token ${this.state.token}`
        }
      })
      .then((response)=>{
        context.commit('GET_ARTICLELIST', response.data)
        console.log(response)
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    deleteArticle(context,payload){
      axios({
        method: 'delete',
        url: `${API_URL}/articles/${payload}`,
        headers : {
          Authorization : `Token ${this.state.token}`
        }
      })
      .then(()=>{
        router.push({name:'ArticleView'})
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    getCommentList(context,articleId){
      axios({
        url: `${API_URL}/articles/${articleId}/comments/`,
        headers : {
          Authorization : `Token ${this.state.token}`
        }
      })
      .then((response)=>{
        context.commit('GET_COMMENT_LIST',response.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    deleteComment(context,payload){
      const articleId = payload.articleId
      const commentId = payload.commentId
      axios({
        method: 'delete',
        url: `${API_URL}/articles/comments/${commentId}/`,
        headers : {
          Authorization : `Token ${this.state.token}`
        }
      })
      .then(()=>{
        context.dispatch('getCommentList', articleId)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
  modules: {
  }
})
