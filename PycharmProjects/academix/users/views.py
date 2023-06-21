from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth import authenticate, login
from .forms import LoginForm, RegisterForm, ForgetPasswordForm, ResetPasswordForm
from .models import EmailVerifyRecord
from django.contrib.auth.models import User
from utils.email_send import send_register_email
from django.contrib.auth.hashers import make_password


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


def register(request):
    if request.method != 'POST':
        form = RegisterForm()
    else:
        form = RegisterForm(request.POST)
        if form.is_valid():
            new_user = form.save(commit=False)
            new_user.set_password(form.cleaned_data['password'])
            new_user.save()
            send_register_email(form.cleaned_data.get('email'), 'register')
            return HttpResponse('Sign Up Successful')
    context = {'form': form}
    return render(request, 'users/register.html', context)


def activate_user(request, activate_code):
    # query the verification code
    all_records = EmailVerifyRecord.objects.filter(code=activate_code)
    if all_records:
        for record in all_records:
            email = record.email
            user = User.objects.get(email=email)
            user.is_staff = True
            user.save()
    else:
        return HttpResponse('Activation Page not Found')
    return redirect('users:login')


def forget_password(request):
    # forget password, request a email
    if request.method == 'GET':
        form = ForgetPasswordForm()
    elif request.method == 'POST':
        form = ForgetPasswordForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('email')
            exists = User.objects.filter(email=email).exists()
            if exists:
                # Sending Email
                send_register_email(email, 'forget')
                return HttpResponse('A email has sent to your email address')
            else:
                return HttpResponse('This email address is not registered')

    return render(request, 'users/forget_password.html', {'form': form})


def reset_password(request, activate_code):
    # reset password
    if request.method != 'POST':
        form = ResetPasswordForm()
    else:
        form = ResetPasswordForm(request.POST)
        if form.is_valid():
            record = EmailVerifyRecord.objects.get(code=activate_code)
            email = record.email
            user = User.objects.get(email=email)
            user.password = make_password(form.cleaned_data.get('password'))
            user.save()
            return HttpResponse('Password Reset Successful')
        else:
            return HttpResponse('Password Reset Failed')

    return render(request, 'users/reset_password.html', {'form': form})
