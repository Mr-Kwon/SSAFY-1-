<template>
  <div>
    <h1 class="text-start" style="margin-top: 30px;">내 컨텐츠</h1>
    <h3 style="margin-top: 50px;" >내가 좋아요 한 컨텐츠</h3>
    <div class="container d-flex">
      <div class="row" style="margin-right: auto;">
        <div class="col-md-12">
          <div id="Carousel" class="carousel slide">
            <div class="carousel-inner1" style="margin-left:80px">
              <div v-for="(group, index) in groupedLikeMovieList" :key="index" :class="['carousel-item', index === 0 ? 'active' : '']">
                <div class="row" style="margin-left:5px">
                  <div v-for="movie in group" :key="movie.id" class="col-md-2 " style="margin-right:10px">
                    <div class="movie-item">
                                          <div class="movie-image-container">                    
                      <a data-bs-target="#exampleModal" data-bs-toggle="modal" class="thumbnail" @click="openModal(movie.id)">
                      <img class="m-4 movie-image" :src="`http://image.tmdb.org/t/p/w200${movie.poster_path}`" alt="Image">
                      </a>
                    </div>

                        <div class="movie-info d-flex flex-column">
                      <p class="hover-title">{{ movie.title }}</p>
                      <p class="rating">평점 ★ {{ movie.vote_average }}</p>
                    </div>
                    </div>
          

                  </div>

                </div>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#Carousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#Carousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <h3>나의 위시리스트</h3>
    <div class="container d-flex">
      <div class="row" style="margin-right: auto;">
        <div class="col-md-12">
          <div id="Carousel2" class="carousel slide">
            <div class="carousel-inner1" style="margin-left:80px">
              <div v-for="(group, index) in groupedWishMovieList" :key="index" :class="['carousel-item', index === 0 ? 'active' : '']">
                <div class="row" style="margin-left:5px">
                  <div v-for="movie in group" :key="movie.id" class="col-md-2" style="margin-right:10px">
                    <div class="movie-item">
                                           <div class="movie-image-container">    
                    <a data-bs-target="#exampleModal" data-bs-toggle="modal" class="thumbnail" @click="openModal(movie.id)">
                      <img class="m-4 movie-image" :src="`http://image.tmdb.org/t/p/w200${movie.poster_path}`" alt="Image">
                    </a>
                    </div>
                     <div class="movie-info d-flex flex-column">
                      <p class="hover-title">{{ movie.title }}</p>
                      <p class="rating">평점 ★ {{ movie.vote_average }}</p>
                    </div>


                    </div>

                  </div>
                </div>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#Carousel2" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#Carousel2" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    

        <!-- Modal -->
  
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div>
            <DetailMovieView />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
    
  </div>
</template>

<script>
import DetailMovieView from '@/views/DetailMovieView'

export default {
  name: 'MyContent',
  components:{
    DetailMovieView
  },
  data() {
    return {
      LikeMovieList: null,
      WishMovieList: null,
      isLoading: true,
    }
  },
  computed: {
    myLikeMovieList(){
      return this.$store.getters.computedLikeMovieList
    },
    myWishMovieList(){
      return this.$store.getters.computedWishMovieList
    },
    groupedLikeMovieList() {
      if (!this.myLikeMovieList) return []

      const groups = []
      const groupSize = 5
      const totalMovies = this.myLikeMovieList.length
      for (let i = 0; i < totalMovies; i += groupSize) {
        groups.push(this.myLikeMovieList.slice(i, i + groupSize))
      }
      return groups
    },
    groupedWishMovieList(){
      if(!this.myWishMovieList) return []
      const groups = []
      const totalMovies = this.myWishMovieList.length
      for (let i=0; i<totalMovies; i+=5){
          groups.push(this.myWishMovieList.slice(i,i+5))
      }
      return groups
    }
  },
  created() {
    this.getUserMovieList()
  },
  methods: {
    getUserMovieList() {
      this.$store.dispatch('myContentList')
    },
    openModal(movieId){
      this.$store.dispatch('getDetailMovie', movieId)
      this.$store.dispatch('getReviewList', movieId)
    }
  },
}
</script>

<style>
.carousel-inner1 {
  width: 1200px; /* 고정된 너비 */
  height: 350px;
}
</style>

