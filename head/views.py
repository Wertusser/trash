from django.shortcuts import render
import random


# Create your views here.
def helps(request):
    return render(request, 'head/help.html')


def about(request):
    return render(request, 'head/about.html')


def index(request):
    random_phrases = [
        'Добро пожаловать, снова.',
        'Тебе это точно не пригодится в жизни.',
        'Привет мир!',
        'Как прошел твой день?',
    ]
    return render(request, 'head/index.html', context={'random_phrase': random.choice(random_phrases)})


def travellers(request):
    return render(request, 'head/travellers.html')

