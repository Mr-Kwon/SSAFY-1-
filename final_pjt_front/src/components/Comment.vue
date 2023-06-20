<template>
  <div class="d-flex flex-column">
    <h3 class="text-center" style="margin-top: 30px;">댓글</h3>
    <CommentForm :articleId="articleId"/>
    <CommentList :articleId="articleId"/>
  </div>
</template>

<script>
import CommentList from '@/components/CommentList'
import CommentForm from '@/components/CommentForm'
export default {
    name:'CommentView',
    props:{
      articleId : Number
    },
    components: {
        CommentList,
        CommentForm
    }

}
</script>

<style>

</style>