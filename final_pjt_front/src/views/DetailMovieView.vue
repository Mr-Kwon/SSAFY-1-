<template>
  <div class="modal-container" style="color: black;">
    <div>
      <div>
        <iframe width="100%" height="405" :src="'https://www.youtube.com/embed/' + movie.video_key +'?autoplay=1'" frameborder="0" allowfullscreen></iframe>
      </div>
      <div class="flex-container">
        <h2 class="movie-title">{{ movie.title }}</h2>
        <div class="icon-container">
          <div class="icon-wrapper" @click="likeMovie">
            <font-awesome-icon :color="getHeartColor(movie.id)" :icon="['fas', 'heart']" size="lg" />
          </div>
          <div class="icon-wrapper" @click="wishMovie">
            <font-awesome-icon :color="getWishColor(movie.id)" :icon="['fasl', 'folder-open']" size="lg" />
          </div>
        </div>
      </div>
      <div class="flex-container2">
        <div class="overview-container">
          <div  style="font-size: 0.875rem;">
            <p class="text-overview">{{ movie.overview }}</p>
            <input type="checkbox" class="more-btn">
          </div>
        </div>
        <div class="info-container">
          <div class="director-container">
            <h6>감독</h6>
            <div class="director-info">
              <span>{{ movie.director.name }}</span>
            </div>
          </div>
          <div class="actor-container">
            <h6>배우</h6>
            <div class="actor-info">
              <div v-for="actor in movie.actors" :key="actor.name">
                <span>{{ actor.name }}</span>
              </div>
            </div>
          </div>
          <div class="date-container">
            <h6>개봉날짜</h6>
            <div class="date-info">
              <span>{{ movie.release_date }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button @click="showReview" class="btn btn-primary">
        리뷰 보기
      </button>
      <div v-if="isBtnClicked">
        <ReviewView :movieId="movie.id"/>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import ReviewView from '@/components/ReviewView'


export default {
  name: 'DetailMovieView',
  components: {
    ReviewView
  },
  computed:{
    movie(){
      return this.$store.getters.computedDetailMovie
    },
    likeMovieData(){
      return this.$store.getters.computedLikeMovie
    },
    wishMovieData(){
      return this.$store.getters.computedWishMovie
    }
  },
  data() {
    return {
      // movie: null,
      showModal: true,
      isBtnClicked : false,
      isHeartClicked: false,
      isWishClicked: false,
      heartColor: 'black',
      wishColor: 'black',
    }
  },

  methods: {
    likeMovie(){
      this.$store.dispatch('likeMovie', this.movie.id)
      this.getHeartColor()
      this.$store.dispatch('myContentList')
    },
    wishMovie(){
      this.$store.dispatch('wishMovie', this.movie.id)
      this.getWishColor()
      this.$store.dispatch('myContentList')
    },
    getHeartColor() {
      // 해당 영화의 'heartColor' 값을 반환
      if(this.likeMovieData){
        const isLike = this.likeMovieData.includes(this.movie.id)
        return isLike ? '#0d6efd' : 'black'
      }else{
        return 'black'
      }

    },
    getWishColor(){
      if(this.wishMovieData){
        const isWished = this.wishMovieData.includes(this.movie.id)
        return isWished ? '#0d6efd' : 'black'
      }else{
        return 'black'
      }

    },
    showReview(){
      this.isBtnClicked = !this.isBtnClicked
    },
  },
};
</script>

<style>
  .modal,.overlay{
      width: 100%;
      height: 100%;
      position: fixed;
  }
  .movie-info{
      padding: 40px 40px 40px 40px;
  }
  .flex-container {
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .movie-title {
    text-align: left;
    margin-left : 20px;
  }
  .icon-container {
    display: flex;
    margin-top: 10px; /* 필요한 경우 간격 조절 */
    margin-left: 50px; /* 필요한 경우 간격 조절 */
    margin-bottom: 20px; /* 필요한 경우 간격 조절 */
  }
  .icon-wrapper {
    cursor: pointer;
    margin-right : 30px;
  }
  .flex-container2 {
    display: flex;
  }
  .overview-container {
    flex: 7;
  }
  .info-container {
    flex: 3;
  }
  .text-overview{
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 0px;
  }
  .more-btn{
      appearance: none;
      border: none;
      padding: 0.5em;
      cursor: pointer;
  }
  .more-btn::before{
      content: '더보기';
      color: #4590e3;
  }
  .more-btn:checked::before{
      content: '닫기';
      color: #4590e3;
  }
  .text-overview:has(+ .more-btn:checked){
      -webkit-line-clamp:unset;
  }
  .director-container {
    display: flex;
    margin-bottom: 5px;
  }
  .director-container h6 {
    margin-left: 70px;
  }
  .director-info {
    flex-grow: 1;
  }
  .actor-container {
    display: flex;
    margin-bottom: 7px;
  }
  .actor-container h6 {
    margin-left: 70px;
  }
  .actor-info {
    flex-grow: 1;
  }
  .date-container {
    display: flex;
  }
  .date-container h6 {
    margin-left: 70px;
  }
  .date-info {
    flex-grow: 1;
    margin-right: 30px;
  }
  aside{
      font-size: 0.875rem;
  }
  aside span{
      color: #d4d7db;
  }
</style>