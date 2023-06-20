<template>
  <div>
    <h1 class="text-start" style="margin-top: 40px;">{{userProfile.nickname}}의 프로필</h1>
    <hr>
    <h3 class="text-start">내가 쓴 리뷰</h3>
    <div class="d-flex flex-column justify-content-center align-items-start m-4">
      <div style="background-color: white; width: 80%; margin: auto; min-height: 800px;">
        <div v-for="review in userProfile.reviews" :key="review.id">
        <a style="font-size: 20px;" data-bs-target="#exampleModal" data-bs-toggle="modal" class="thumbnail myreview" >
            <p style="color: black;" class="text-start my-text" @click="openModal(review.id)">{{review.content}}</p> 
        </a>
      </div>


      </div>


    </div>
    <hr>
    <div>
      <h3 class="text-start m-4">내가 쓴 게시글</h3>
      <div style="background-color: white; width: 80%; margin: auto; min-height: 800px;">
        <div v-for="article in userProfile.articles" :key="article">
        <a :href="`http://localhost:8080/articles/${article.id}`" style="text-decoration:none;">
            <h3 style="color: black; margin:10px" class="text-start">{{article.title}}</h3>
            <p style="color:black; text-start margin: 10px" class="article-list-content">{{article.content}}</p>
            <hr>
        </a>
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
    name: 'ProfileView',
    components:{
        DetailMovieView
    },
    computed:{
        userProfile(){
            return this.$store.state.userProfile
        }
    },
    created(){
        this.getUserProfile()
    },
    methods: {
        getUserProfile(){
            this.$store.dispatch('getUserProfile')
            console.log(this.userProfile)
        },
        openModal(movieId){
          // console.log(movieId)
            this.$store.dispatch('getDetailMovie', movieId)
            this.$store.dispatch('getReviewList', movieId)
        }
    }
}
</script>

<style>
.myreview{
  text-decoration: none;
  color: white;
  border-bottom: 1px solid black;}
.my-text{
  padding-bottom:10px;
  width: 80%;
  border-bottom: 1px solid lightgray;
}
</style>