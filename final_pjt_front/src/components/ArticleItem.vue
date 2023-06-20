<template>
  <div>
    <div>
      <router-link class="article-title" :to="{name:'ArticleDetailView', params:{articleId:article.id}}">
      <h2 style="margin-bottom: 20px;">{{article.title}}</h2>
      </router-link>
      <div class="article-list-content">
        <p >{{ article.content }}</p>
      </div>
      <span style="color: rgb(165, 165, 165);">by {{article.username}}</span>
      <hr>
    </div>
  </div>
</template>

<script>
export default {
    name: 'ArticleItem',
    props: {
        article : Object
    }
}
</script>

<style>
.article-title{
  text-decoration: none;
  color: white;
}
.article-list-content{
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;   
}
</style>