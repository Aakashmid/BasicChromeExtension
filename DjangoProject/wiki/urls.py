
from django.urls import path,include
from wiki import views
urlpatterns = [
    path('', views.index, name='index'),
    path('get_wiki_summary/', views.get_wiki_summary, name='get_wiki_summary'),
]