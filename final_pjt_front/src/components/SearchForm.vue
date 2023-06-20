<template>
  <div class="search-bar">
    <form @submit="onSearch" class="d-flex" role="search">
      <input class="form-control me-2" v-model="keyword" type="search" placeholder="제목,내용,감독" aria-label="Search">
      <button class="btn btn-outline-primary" type="submit">Search</button>
    </form>
  </div>
</template>

<script>
export default {
 name: 'SearchForm',
 data(){
    return {
        keyword: null,
    }
 },
 methods: {
    onSearch(){
        this.$router.push({name:'SearchMovieView', params:{keyword:this.keyword}})
    }
 }
}
</script>

<style>
.search-bar{
  margin: 0px 0px 0px auto;
}
</style>