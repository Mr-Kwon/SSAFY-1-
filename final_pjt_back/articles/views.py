from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import authentication_classes, permission_classes

from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import ArticleListSerializer, ArticleSerializer, CommentSerializer
from .models import Article, Comment
# Create your views here.

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def article_list(request):
    if request.method =='GET':
        articles = get_list_or_404(Article)
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
@api_view(['GET', 'DELETE', 'PUT'])
def article_detail(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    
    if request.method == 'GET':
        serializer = ArticleSerializer(article)
        print(serializer.data)
        return Response(serializer.data)
    
    elif request.method == 'DELETE':
            
    # 현재 사용자와 게시글 작성자 비교
        if article.user != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 
    
    elif request.method == 'PUT':
        serializer = ArticleSerializer(article, data=request.data)
    # 현재 사용자와 게시글 작성자 비교
        if article.user != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
@api_view(['GET'])
def comment_list(request, article_id):
    if request.method == 'GET':
        comments = Comment.objects.filter(article_id=article_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    
@api_view(['GET', 'DELETE', 'PUT'])
def comment_detail(request, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)
    
    if comment.user != request.user:
        return Response({"message": "권한이 없습니다."}, status=status.HTTP_403_FORBIDDEN)
    
    if request.method == 'GET':
        serilaizer = CommentSerializer(comment)
        return Response(serilaizer.data)
    
    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    elif request.method == 'PUT':
        serilaizer = CommentSerializer(comment, data=request.data)
        if serilaizer.is_valid(raise_exception=True):
            serilaizer.save()
            return Response(serilaizer.data)
        

@api_view(['POST'])
def comment_create(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    
    # 댓글 작성자를 현재 요청을 보내는 사용자로 설정
    comment_data = request.data
    comment_data['user'] = request.user.pk
    
    serializer = CommentSerializer(data=comment_data)
    if serializer.is_valid():
        serializer.save(article=article, user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)