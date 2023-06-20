<template>
    <div style="background-color: white; min-height: 100vh;" class="d-flex justify-content-center text-black">
        <div class="article-box">
            <div style="margin-top:60px;" class="d-flex flex-column justify-content-center">
                    <strong><p style="font-size: 42px;" class="text-center">{{article?.title}}</p></strong>
                    <span style="margin-top: 0px; font-size: 18px; color: gray;">by. {{article?.username}}</span>                
                    <hr >
            </div>
        
        <p style="font-size: 20px; margin-top: 20px;">{{article?.content}}</p>
        <div class="d-flex justify-content-center" style="color: gray;">
            <p>작성 시간 : {{createdAt}}</p>
            <p style="margin-left: 10px;">수정 시간 : {{updateAt}}</p>
        </div>
        <div v-if="article.username == username">
            <a class="btn btn-outline-primary" :href="`http://localhost:8080/articles/${this.$route.params.articleId}/update`">수정하기</a>
            <button class="btn btn-outline-primary" style="margin-left: 10px;" @click="deleteArticle">삭제하기</button>
        </div>
        <hr>
            <Comment :articleId="article.id"/>
        </div>
        
    </div>

</template>

<script>
import Comment from '@/components/Comment'
import axios from 'axios'
export default {
    name: 'ArticleDetailView',
    components: {
        Comment
    },
    data(){
        return{
            article: null
        }
    },
    computed:{
        username(){
            return this.$store.state.username
        },
        createdAt(){
            return this.article.created_at.substr(0,10)
        },
        updateAt(){
            return this.article.updated_at.substr(0,10)
        }

    },
    created(){
        this.getArticleDetail()
    },
    methods:{
        getArticleDetail(){
            axios({
                url: `http://127.0.0.1:8000/articles/${this.$route.params.articleId}/`,
                headers: {
                Authorization: `Token ${this.$store.state.token}`
                },
            })
            .then((response)=>{
                this.article = response.data
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        deleteArticle(){
            this.$store.dispatch('deleteArticle',this.$route.params.articleId)
        }
    }
}
</script>


<style>
.article-box{
    width: 70%;
}
</style>