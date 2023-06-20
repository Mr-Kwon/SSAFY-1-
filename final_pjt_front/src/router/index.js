import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieView from '@/views/MovieView'
import HomeView from '@/views/HomeView'

import SignUpView from '@/views/SignUpView'
import LoginView from '@/views/LoginView'
import SearchMovieView from '@/views/SearchMovieView'

import RecommendView from '@/views/RecommendView'

import UpdateProfileView from '@/views/UpdateProfileView'
import MyContentView from '@/views/MyContentView'
import ProfileView from '@/views/ProfileView'
import ArticleView from '@/views/ArticleView'
import ArticleDetailView from '@/views/ArticleDetailView'
import ArticleCreateView from '@/views/ArticleCreateView'
import ArticleUpdateView from '@/views/ArticleUpdateView'
import NotFound404View from '@/views/NotFound404View'
Vue.use(VueRouter)

const routes = [
  {
    path: '/movies/:page',
    name: 'MovieView',
    component: MovieView
  },
  {
    path: '/recommend',
    name: 'RecommendView',
    component: RecommendView
  },
  {
    path: '/articles/:articleId/update',
    name: 'ArticleUpdateView',
    component: ArticleUpdateView
  },
  {
    path: '/articles',
    name: 'ArticleView',
    component: ArticleView
  },
  {
    path: '/articles/:articleId',
    name: 'ArticleDetailView',
    component: ArticleDetailView
  },
  {
    path: '/create/articles',
    name: 'ArticleCreateView',
    component: ArticleCreateView
  },
  {
    path: '/updateprofile/',
    name: 'UpdateProfileView',
    component: UpdateProfileView
  },
  {
    path: '/profile',
    name: 'ProfileView',
    component: ProfileView
  },
  {
    path: '/mymovies/',
    name: 'MyContentView',
    component: MyContentView
  },
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/search/keyword=:keyword',
    name: 'SearchMovieView',
    component: SearchMovieView
  },
  {
    path: '/errors/404NotFound',
    name: 'NotFound404View',
    component: NotFound404View
  },
  {
    path: '*',
    redirect: '/errors/404NotFound'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
