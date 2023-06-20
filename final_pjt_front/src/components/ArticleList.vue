<template>
  <div class="d-flex justify-content-center">
    <div class="article-list text-start">
      <ArticleItem  v-for="article in articleList" :key="article.id" :article="article"/>
    </div>
  </div>

</template>

<script>
import ArticleItem from '@/components/ArticleItem'
export default {
    name: 'ArticleList',
    components:{
        ArticleItem
    },
    computed:{
      articleList(){
        return this.$store.state.articleList
      }
    },
   created(){
        this.getArticleList()
    },
    methods: {
        getArticleList(){
          
            this.$store.dispatch('getArticleList')
        }
    }
}
</script>

<style>
.article-list{

  width: 80%;
  border-radius: 2px;
}
</style>