<template>
  <div>
    <h1 class="text-start" style="margin-top: 30px;">영화 목록</h1>
    <div class="d-flex justify-content-start mt-4">
      <div class="btn-group">
        <button class="sort-button" :class="{ active: sortOption === 'popularity' }" @click="changeSortOption('popularity')">인기순</button>
        <button class="sort-button" :class="{ active: sortOption === 'vote_average' }" @click="changeSortOption('vote_average')">평점순</button>
        <button class="sort-button" :class="{ active: sortOption === 'title' }" @click="changeSortOption('title')">가나다순</button>
      </div>
    </div>
    <div class="container mx-auto">
      <div class="d-flex justify-content-center">
        <div class="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-4 mx-auto">
          <MovieItem v-for="movie in movies" :key="movie.title" :movie="movie" @openModal="openModal" />
        </div>
      </div>
    </div>


    <!-- Modal -->
    
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header" style="height:10px">
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

    <!-- 페이지 네이션 -->
    <div class="d-flex justify-content-center">
      <a class="page-button  btn btn-outline-primary" :href="getPageUrl(1)+sortOption">처음으로</a>
      <button class="page-button  btn btn-outline-primary" style="margin-right:10px; margin-left:10px;" @click="prevPage">이전</button>
      <div v-for="i in displayPerPage" :key="i">
        <a class="page-button" style="font-size: 18px; text-decoration:none;" :class="{ active: i === currentPage }" :href="`${getPageUrl(i)}${sortOption}`">{{ i }}</a>
      </div>
      <button class="page-button  btn btn-outline-primary" style="margin-right:10px; margin-left: 10px;" @click="nextPage">다음</button>
      <a class="page-button  btn btn-outline-primary" :href="getPageUrl(totalPage)+sortOption">마지막으로</a>
    </div>
  </div>
</template>

<script>
import DetailMovieView from '@/views/DetailMovieView'
import MovieItem from '../components/MovieItem.vue'
import axios from 'axios'

export default {
  name: 'MovieView',
  components: {
    MovieItem,
    DetailMovieView
  },
  data() {
    return {
      movies: null,
      totalPage: 34,
      showModal: false,
      selectedMovieId: null,
      seletedMovie: {},
      sortOption: this.$route.query.sort || 'movie_id' // 기본 정렬 옵션 설정
    }
  },
  computed: {
    displayPerPage() {
      if (this.startPage + 9 > this.totalPage){
        return Array.from({ length: 4 }, (_, index) => this.startPage + index)
      } else{
        return Array.from({ length: 10 }, (_, index) => this.startPage + index)
      }
      
    },
    currentPage() {
      return parseInt(this.$route.params.page) || 1
    },
    startPage() {
      return Math.floor((this.currentPage - 1) / 10) * 10 + 1
    },
    
  },
  watch: {
    currentPage: {
      handler() {
        this.getPerPageMovies();
      },
      immediate: true // 초기 로드시에도 호출되도록 immediate 옵션을 추가
    }
  },
  methods: {
    getPerPageMovies() {
      axios({
        url: `http://127.0.0.1:8000/movies/${this.currentPage}/?sort=${this.sortOption}`,
      })
        .then((response) => {
          this.movies = response.data.movies
          this.sortOption = response.data.sort_option // 응답에서 정렬 기준을 받아옴
        })
        .catch((err) => {
          console.log(err)
        })
    },
    prevPage() {
      if (this.startPage > 10) {
        const prevPage = this.startPage - 10;
        const query = `sort=${this.sortOption}`;
        const url = `/movies/${prevPage}?${query}`;
        window.location.href = url;
      }
    },
    nextPage() {
      if (this.startPage + 10 <= this.totalPage) {
        const nextPage = this.startPage + 10;
        const query = `sort=${this.sortOption}`;
        const url = `/movies/${nextPage}?${query}`;
        window.location.href = url;
      }
    },
    openModal(movieId){
      // console.log(movieId)\
      this.selectedMovieId = movieId
      this.showModal = true
      
    },
    closeModal(){
      this.showModal = false
    },
    changeSortOption(option) {
    if (this.sortOption !== option) {
      this.sortOption = option
      this.getPerPageMovies()

      const currentPage = this.currentPage
      const query = `sort=${this.sortOption}`

      this.$router.push(`/movies/${currentPage}?${query}`)
      }
    },
    getPageUrl(page) {
      return `http://localhost:8080/movies/${page}?sort=`
    },
    // 정렬 옵션에 따라서...다른 url 을 생성하기 
    // 정렬 옵션을 선택하면 반복문으로 만들어진 html 요소의 href 속성을 바꿀 수 있니??
    //
  },
}
</script>

<style>
.btn-group {
  display: flex;
  gap: 3em; /* 간격을 원하는 크기로 조정합니다. */
  margin-left: 40px;
  margin-bottom: 20px;
}
.sort-button {
  background-color: transparent;
  border: none;
  padding: 0;
  font-size: 25px;
  font-family: inherit;
  cursor: pointer;
  text-decoration: none;
  color: white; /* 버튼 텍스트 색상을 원하는 색으로 변경하세요. */
}
.sort-button.active {
  font-weight: bold;
  color : #3a8eee;
}
.text-start {
  text-align: start;
  margin-left: 30px;
  margin-top: 10px;
}
.page-button{
  padding: 2px;
  margin-bottom: 10px;
}

</style>
