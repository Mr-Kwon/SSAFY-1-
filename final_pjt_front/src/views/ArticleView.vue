<template>
  <div>
    <div class="d-flex">
      <h1 class="text-start" style="margin-top: 40px;">Article</h1>
      <router-link  tag="button" class="create-link btn btn-primary" style="text-align: center; margin-top: 40px;" :to="{name:'ArticleCreateView'}">글 작성하기</router-link>
    </div>
    <div>
      <ArticleList/>
    </div>
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList'
export default {
    name: 'ArticleView',
    components: {
        ArticleList,
    },

}
</script>

<style>
.create-link{
  text-decoration: none;
  font-size: 20px;
  margin: 15px 30px 20px 30px;
}
</style>