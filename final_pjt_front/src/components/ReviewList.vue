<template>
    <div style="margin-top: 10px;">
      <div v-for="review in reviews" :key="review.id" >
        <strong><span style="margin-right: 10px; color: rgb(33, 33, 165);">작성자{{ review.username }}</span></strong>
          <span>{{review.content }}</span>
          <span style="margin-left: 10px; color: darkgoldenrod;">{{ review.rank }}점</span>
          <div v-if="currentUsername === review.username">
              <button class="btn btn-primary" @click="deleteReview(review.id)">삭제</button>
              <button class="btn btn-primary" style="margin-left: 10px;" @click="addList(review.id)">수정</button>
              <div v-if="isBtnClicked(review.id)">
                  <form @submit.prevent="updateReview(review.id)">
                    <div class="d-flex justify-content-center align-items-center">
                                            <div>
                        <input class="comment-input" type="text" v-model="content" style="width: 500px; height: 60px;">
                    </div>
                      
                        <div class="star-rating">
                      <input v-model="rank" type="radio" id="05-stars" name="rating" value="5" />
                      <label  for="05-stars" class="star">&#9733;</label>
                      <input v-model="rank" type="radio" id="04-stars" name="rating" value="4" />
                      <label for="04-stars" class="star">&#9733;</label>
                      <input v-model="rank" type="radio" id="03-stars" name="rating" value="3" />
                      <label for="03-stars" class="star">&#9733;</label>
                      <input v-model="rank" type="radio" id="02-stars" name="rating" value="2" />
                      <label for="02-stars" class="star">&#9733;</label>
                      <input v-model="rank" type="radio" id="01-star" name="rating" value="1" />
                      <label for="01-star" class="star">&#9733;</label>
                      </div>
                      <button class="btn btn-primary">작성</button>

                    </div>

                  </form>
              </div>
          </div>
      </div>
    </div>
  </template>
  
  <script>
    import Swal from 'sweetalert2/dist/sweetalert2.js'
  import axios from 'axios'
  export default {
      name: 'ReviewList',
      props:{
          movieId: Number
      },
      data(){
          return{
              clickedBtn : null,
              content : null,
              rank : null,
          }
      },
      computed:{
          reviews(){
              return this.$store.getters.computedReviewList
          },
          currentUsername(){
              return this.$store.state.username
          },
      },
      created(){
          this.getMovieReviews(this.movieId)
      },
      methods:{
          getMovieReviews(){
              const movieId = this.movieId
              this.$store.dispatch('getReviewList', movieId)
          },
          deleteReview(reviewId){
              const movieId = this.movieId
              const payload = {
                  movieId, reviewId
              }
              this.$store.dispatch('deleteReview', payload)
          },
          isBtnClicked(reviewId){
              return this.clickedBtn === reviewId
          },
          addList(reviewId){
              if(this.clickedBtn){
                  this.clickedBtn = null
              } else{
                  this.clickedBtn = reviewId
              }
              axios({
                  url: `http://127.0.0.1:8000/movies/reviews/${reviewId}/`,
                  headers: {
                      Authorization: `Token ${this.$store.state.token}`
                  },
              })
              .then((response)=>{
                  this.content = response.data.content
              })
  
          },
          updateReview(reviewId){
              const content = this.content
              const rank = this.rank
              if(!rank){
                Swal.fire({
                    icon:'error',
                    title:'별점을 입력해주세요',
                    confirmButtonText: '확인'
                })
              }else if(!content){
                Swal.fire({
                    icon:'error',
                    title:'내용을 입력해주세요',
                    confirmButtonText: '확인'
                })
              }
              axios({
                  method: 'put',
                  url: `http://127.0.0.1:8000/movies/reviews/${reviewId}/`,
                  headers: {
                      Authorization: `Token ${this.$store.state.token}`
                  },
                  data: {
                      content, rank
                  }
              })
              .then(()=>{
                  const movieId = this.movieId
                  this.$store.dispatch('getReviewList', movieId)
                  this.content = null
                  this.rank = null
              })
              .catch((err)=>{
                  console.log(err)
              })
          }
  
      }
  }
  </script>
  
  <style>
  .star-rating {
    border:solid 1px #ccc;
    display:flex;
    flex-direction: row-reverse;
    font-size:1.5em;
    justify-content:space-around;
    padding:0 .2em;
    text-align:center;
    width:5em;
  }
  
  .star-rating input {
    display:none;
  }
  
  .star-rating label {
    color:#ccc;
    cursor:pointer;
  }
  
  .star-rating :checked ~ label {
    color:#f90;
  }
  
  .star-rating label:hover,
  .star-rating label:hover ~ label {
    color:#fc0;
  }
  </style>