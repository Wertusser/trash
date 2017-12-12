from django.shortcuts import render, redirect
import random

start_views = [
    'idea',
    'fears',
]


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


def start_trip(request):
    return redirect(random.choice(start_views))


def next_url(request):
    return redirect(random.choice(start_views))


################################
#          Trip urls
################################
def fears(request):
    fears_templates = [
        'fears/poverty.html',
        'fears/death.html',
        'fears/betrayal.html'
    ]
    return render(request, random.choice(fears_templates))


def idea(request):
    return render(request, 'small/idea.html')
