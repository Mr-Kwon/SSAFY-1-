<template>
  <div  data-bs-toggle="modal" data-bs-target="#exampleModal"  class="movie-item" @click="openModal(movie.id)">
    <a>
      <div class="movie-image-container">
        <img :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`" class="movie-image" :alt="`${movie.title}`">
        <p class="title">{{ movie.title }}</p> 
      </div>
      <div class="movie-info d-flex flex-column">
        <p class="hover-title">{{ movie.title }}</p>
        <p class="rating">평점 ★ {{ movie.vote_average }}</p>
      </div>
    </a>
  </div>
</template>

<script>
export default {
    name: 'MovieItem',
    props: {
        movie : Object
    },
    methods: {
      openModal(movieId){
        // this.$emit('openModal',movieId)
        this.$store.dispatch('getDetailMovie',movieId)
        this.$store.dispatch('getReviewList', movieId)
      },
      // test(){
      //   console.log(this.movie)
      // }
    }

}
</script>

<style>
.movie-item {
  display: inline-block;
  position: relative;
}

img{
  border-radius: 7px;
}

.movie-image {
  height: 285px;
  width: 200px;
  transition: transform 0.3s, filter 0.3s;
}

.movie-item:hover .movie-image {
  transform: scale(1.1);
  filter: brightness(50%);
  cursor: pointer;
  /* background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 100%, rgba(0, 0, 0, 0.7) 0%); */
}
.movie-info {
  position: absolute;
  bottom: 30px;
  left: 10px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  color: white;
  text-align: left;
  
  opacity: 0;
  transition: opacity 0.3s;
}

.movie-item:hover .movie-info {
  opacity: 1;
}

/* .info-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
} */

.title{
  font-size: 16px;
  text-decoration: none;
}

.hover-title {
  font-weight: bold;
  font-size: 20px;
  margin-right: 10px;
}

.rating {
  font-size: 16px;
}
</style>