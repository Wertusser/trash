from django.shortcuts import render
from mom_lovers.models import Thread, Post
from mom_lovers.serializers import ThreadSerializer, PostSerializer
from rest_framework import generics
from django.views.generic import ListView


class IndexView(ListView):
    template_name = 'mom_lovers/index.html'
    context_object_name = 'Content'

    def get_queryset(self):
        return Thread.objects.all()


class ThreadView(ListView):
    template_name = 'mom_lovers/thread.html'
    context_object_name = 'Thread'

    def get_queryset(self, **kwargs):
        return Post.objects.filter(thread_id=self.kwargs['pk'])

    def get_context_data(self, **kwargs):
        thread = Thread.objects.get(id=self.kwargs['pk'])
        context = super(ThreadView, self).get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(thread_id=thread.id)
        context['thread'] = thread
        return context


class ThreadList(generics.ListCreateAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer


class ThreadDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
