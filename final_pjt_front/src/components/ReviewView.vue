<template>
  <div>
    <hr>
    <h3 class="text-center">리뷰</h3>
    <ReviewForm :movieId="movieId"/>
    <ReviewList :movieId="movieId"/>
  </div>
</template>

<script>
import ReviewForm from '@/components/ReviewForm'
import ReviewList from '@/components/ReviewList'
export default {
  name: 'ReviewView',
  props: {
    movieId : Number
  },
  components: {
    ReviewForm,
    ReviewList,
  }
}
</script>

<style>

</style>