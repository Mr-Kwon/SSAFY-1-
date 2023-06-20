<template>

    <div>
  <div class="d-flex flex-column justify-content-center">
    <div v-for="(comment) in comments" :key="comment.id" class="comment-container">
      <div class="d-flex align-items-center">
        <div class="comment-info">
          <strong style="color: blue; margin-right:10px">{{ comment.username }}</strong>
          <span>{{ comment.content }}</span>
        </div>
        <div class="comment-actions" v-if="currentUsername ==comment.username">
          <button class="btn btn-outline-primary" style="width:60px; height:40px; margin-left:10px; margin-right:10px" @click="addList(comment.id)">수정</button>
          <button class="btn btn-outline-primary" style="height:40px; width:60px;" @click="deleteComment(comment.id)">삭제</button>
        </div>
      </div>
      <div class="comment-form" v-if="isBtnClicked(comment.id)">
        <form @submit.prevent="updateComment(comment.id)" class="d-flex flex-column align-items-center">
          <input class="comment-input" type="text" v-model="content" style="width: 700px; height: 80px;">
          <button class="btn btn-primary">작성</button>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios'
export default {
    name:'CommentList',
    props: {
        articleId: Number
    },
    data(){
        return{
            clickedBtn: null,
            content : null,
        }
    },
    computed: {
        comments(){
            return this.$store.getters.computedCommentList
        },
        commentsCnt(){
            return this.comments.length
        },
        currentUsername(){
            return this.$store.state.username
        },
        
    },
    created(){
        this.getCommentList(this.articleId)
    },
    methods: {
        getCommentList(){
            this.$store.dispatch('getCommentList', this.articleId)
        },
        deleteComment(commentId){
            const articleId = this.articleId
            const payload = {
                commentId, articleId
            }
            this.$store.dispatch('deleteComment',payload)
        },
        isBtnClicked(commentId){
        //클릭된 버튼의 커멘트 id
            return this.clickedBtn === commentId
        },
        addList(commentId){
            if(this.clickedBtn){
                this.clickedBtn = null
            } else {
                this.clickedBtn = commentId
            }
            axios({
                url: `http://127.0.0.1:8000/articles/comments/${commentId}/`,
                headers: {
                    Authorization: `Token ${this.$store.state.token}`
                },
            })
            .then((response)=>{
                this.content = response.data.content
            })
        },
        updateComment(commentId){
            const content = this.content
                            if(!content){
                    Swal.fire({
                    title: '내용을 입력해주세요',
                    icon: 'error',
                    confirmButtonText: '확인'
                    })
                    return
                }
            axios({
                method: 'put',
                url: `http://127.0.0.1:8000/articles/comments/${commentId}/`,
                headers: {
                    Authorization: `Token ${this.$store.state.token}`
                },
                data: {
                    content
                }
            })
            .then(()=>{

                this.$store.dispatch('getCommentList', this.articleId)
                this.content = null
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
}
</script>

<style>
.comment-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.comment-info {
  margin-top: 5px;
  text-align: center;
  border-bottom: 1px solid lightgray;
  width: 720px;
}

.comment-actions {
  display: flex;
  justify-content: center;
  margin-left: auto;
}

.comment-form {
  text-align: center;
}
</style>