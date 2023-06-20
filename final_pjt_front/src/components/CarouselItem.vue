<template>
    <div>
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" data-bs-pause="false" style="position: relative;">
            <div class="carousel-inner">
                <div v-for="(movie, index) in movieList" :key="index">
                    <div :class="[index== 1 ? 'carousel-item active': 'carousel-item']" data-bs-interval="4000">
                        <img :src="`http://image.tmdb.org/t/p/original${movie.backdrop_path}`" class="d-block w-100" alt="이미지가 없어요">
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            <div class="home-text">
                <p>Find Your Own Movie</p>
                <button @click="goMovie" class="btn btn-primary">Go To Movie List</button>
            </div>
        </div> 
    </div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'CarouselItem',
    data(){
        return{
            movieList : []
        }
    },
    created(){
        this.getImage()
    },
    methods : {
        getImage(){
            axios({
                url:'https://api.themoviedb.org/3/movie/top_rated?api_key=cdb84e32fe9892b6b1fad1b2dceb89d0&language=ko-KR&page=1',
            })
            .then((response)=>{
                console.log(response)
                this.movieList = response.data.results
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        goMovie(){
            this.$router.push({name:'MovieView', params:{page:1}})
        }
    }
}
</script>

<style>
.carousel-inner img{
    filter: brightness(50%);
}
.home-text {
    font-size: 70px;
    position: absolute;
    top: 26%;
    left: 0;
    right: 0;
    text-align: center;
    transform: translateX(-50%);
    margin-left: 50%;
}

</style>