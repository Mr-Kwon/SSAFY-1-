<template>
  <div>
    <h1 class="text-start" style="margin-top: 40px;">게시글 수정</h1>
    <form @submit="updateArticleDetail">
        <input type="text" style="width: 800px; height: 80px; font-size: 30px;" v-model.trim="title" placeholder="제목을 입력하세요">
        <br>
        <br>
        <textarea id="article-content" cols="97" rows="30" v-model="content"></textarea>
        <br>
        <input class="btn btn-primary" type="submit">
        
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios'
export default {
    name:'ArticleUpdate',
    data(){
        return{
            title : null,
            content: null
        }
    },
    created(){
        this.getArticleDetail()
    },
    methods: {
        getArticleDetail(){
            
            axios({
                url: `http://127.0.0.1:8000/articles/${this.$route.params.articleId}/`,
                headers: {
                Authorization: `Token ${this.$store.state.token}`
                },
       
            })
            .then((response)=>{
                this.title = response.data.title
                this.content = response.data.content
            })
            .catch((err)=>{
                console.log(err)
            })

        },
        updateArticleDetail(){
            const title = this.title
            const content = this.content
if(!this.content){
                Swal.fire({
                    icon: 'error',
                    title: '내용을 입력해주세요',
                    confirmButtonText: '확인'
                })
                return

            } else if(!this.title){
                Swal.fire({
                    icon: 'error',
                    title: '제목을 입력해주세요',
                    confirmButtonText: '확인'
                })
                return
            }
            axios({
                method: 'put',
                url: `http://127.0.0.1:8000/articles/${this.$route.params.articleId}/`,
                data: {
                    title,content
                },
                headers: {
                Authorization: `Token ${this.$store.state.token}`
                },
            })
            .catch((err)=>{
                console.log(err)
            })
            this.$router.push({name:'ArticleDetailView', params:{articleId: this.$route.params.articleId}})
        }
    }
}
</script>

<style>

</style>