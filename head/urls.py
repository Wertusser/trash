from django.urls import path

from . import views

general_urls = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('help/', views.helps, name='help'),
    path('travellers/', views.travellers, name='travellers'),
    path('start_trip/', views.start_trip, name='start_trip'),
    path('next/', views.next_url, name='next'),
]

projects = [
    path('idea/', views.idea, name='idea'),
    path('fear/', views.fears, name='fears'),

]

urlpatterns = general_urls + projects
