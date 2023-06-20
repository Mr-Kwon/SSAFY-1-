<template>
  <div>
    <h1 class="text-start" style="margin-top: 40px;">게시글 작성하기</h1>
    <form @submit.prevent="createArticle">
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
    name: 'ArticleCreateView',
    data(){
        return{
            title: null,
            content: null,
        }
    },
    methods:{
        createArticle(){
            const title=this.title
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
            }axios({
                method: 'post',
                url: `http://127.0.0.1:8000/articles/`,
                headers: {
                Authorization: `Token ${this.$store.state.token}`
                },
                data: {title,content}
            })
            .then(()=>{
                // console.log(response)
                this.$router.push({name:'ArticleView'})
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>