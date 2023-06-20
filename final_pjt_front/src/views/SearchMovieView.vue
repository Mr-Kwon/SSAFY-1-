<template>
    <div>
      <h1 class="text-start m-4">'{{ this.$route.params.keyword }}' 검색 결과</h1>
      <div class="d-flex container-fluid row row-cols-1 row-cols-md-6 g-4">
          <SearchMovieItem v-for="movie in movies" :key="movie.title" :movie="movie"/>
      </div>

  
  
                <!-- Modal -->
      
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-xl" >
              <div class="modal-content">
              <div class="modal-header" style="height:10px">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <div>
                  <DetailMovieView/>
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
  import SearchMovieItem from '@/components/SearchMovieItem'
  import axios from 'axios'
  export default {
      name: 'SearchMovieView',
      components:{
          SearchMovieItem,
          DetailMovieView
      },
      data(){
          return {
              movies : null
          }
      },
      created(){
          this.getSearchMovies()
      },
      methods: {
          getSearchMovies(){
              axios({
                  url: `http://127.0.0.1:8000/movies/${this.$route.params.keyword}/`
              })
              .then((response)=>{
                  this.movies = response.data
              })
              .catch((err)=>{
                  console.log(err)
              })
          }
      }
  }
  
  
  </script>
  
  <style>
  
  </style>