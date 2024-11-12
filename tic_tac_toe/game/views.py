from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'game/index.html')

def mode(request):
    return render(request, 'game/mode.html')

def game(request):
    return render(request, 'game/game.html')
