from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

app_name = 'mom_lovers'

urlpatterns = [
    path('', views.IndexView.as_view(), name='mom_lovers'),
    path('<int:pk>/', views.ThreadView.as_view(), name='mom_lovers_thread'),
    path('api/threads/', views.ThreadList.as_view(), name='mom_lovers_thread_list'),
    path('api/posts_<int:pk>/', views.PostList.as_view(), name='mom_lovers_thread_posts_list'),
    path('api/thread/<int:pk>', views.ThreadDetail.as_view(), name='mom_lovers_get_thread'),
    path('api/post/<int:pk>/', views.PostDetail.as_view(), name='mom_lovers_get_post')
]
urlpatterns = format_suffix_patterns(urlpatterns)
