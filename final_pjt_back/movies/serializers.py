from rest_framework import serializers
from .models import Movie, Review, Genre, Actor, Director

class MovieSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = Movie
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.StringRelatedField(source="user.username", read_only=True)
    class Meta:
        
        model = Review
        fields = '__all__'
        read_only_fields = ('user','movie',)
        
class DirectorNameSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = Director
        fields = ('name', )
        
class GenreListSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = Genre
        fields = ('id', 'name')
        
class ActorListSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = Actor
        fields = ('id', 'name')
        
class MovieDetailSerializer(serializers.ModelSerializer):
    # 장르, 영화감독 , 배우, 영화, 
    genre = GenreListSerializer(many=True, read_only=True)
    director = DirectorNameSerializer(read_only=True)
    actors = ActorListSerializer(many=True, read_only=True)
    class Meta:
        model = Movie
        exclude = ('vote_count', 'revenue', 'budget', 'popularity')
    
