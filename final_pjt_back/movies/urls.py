from django.urls import path
from . import views
app_name = 'movies'
urlpatterns = [
    path('<int:page_number>/', views.movie_home),  # 영화 추천 웹 페이지
    path('d=<int:movie_pk>/', views.movie_detail),  # 영화 상세 정보 팝업
    path('<str:sw_value>/', views.movie_search), # 검색어에 따른 페이지
    path('<int:movie_pk>/likes/', views.likes),
    path('<int:movie_pk>/wish/', views.wish),
    path('<int:movie_id>/reviews/', views.get_review_list, name='get_review_list'),
    path('reviews/<int:review_id>/', views.update_or_delete_review, name='update-delete-review'),
    path('reviews/create/<int:movie_id>/', views.create_review, name='create-review'),
    
    # path('page/<int:page_number>/', views.movie_page),  # 페이지 번호로 페이지로 이동
]