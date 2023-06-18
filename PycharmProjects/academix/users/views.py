from django.shortcuts import render, HttpResponse
from django.contrib.auth import authenticate, login
from .forms import LoginForm


def login_view(request):
    if request.method != 'POST':
        form = LoginForm()
    else:
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                # if login successful jump to new page
                return HttpResponse('Login Successful')
            else:
                # authenticate unsuccessful
                return HttpResponse("Username or Password Wrong!")
    context = {'form': form}
    return render(request, 'users/login.html', context)
