<template>
  <div data-bs-toggle="modal" data-bs-target="#exampleModal"  class="movie-item" @click="openModal(movie.id)">
    <div class="movie-image-container">
          <a >
        <img :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`" style="height: 285px; width: 200px" class="rounded movie-image" :alt="`${movie.title}`">
        <p>{{movie.title}}</p>
    </a>
    </div>

      <div class="movie-info d-flex flex-column">
        <p class="hover-title">{{ movie.title }}</p>
        <p class="rating">평점 ★ {{ movie.vote_average }}</p>
        </div>
  </div>
</template>

<script>
export default {
    name: 'SearchMovieItem',
    props: {
        movie: Object
    },
    methods:{
      openModal(movieId){
      this.$store.dispatch('getDetailMovie', movieId)
      this.$store.dispatch('getReviewList', movieId)
    }
    }
}
</script>

<style>

</style>