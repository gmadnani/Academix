from django import forms
from django.contrib.auth.models import User


class LoginForm(forms.Form):
    username = forms.CharField(label='username', max_length=15, widget=forms.TextInput(attrs={
        'class': 'input', 'placeholder': 'Username'
    }))
    password = forms.CharField(label='password', min_length=6, widget=forms.PasswordInput(attrs={
        'class': 'input', 'placeholder': 'Password'
    }))


class RegisterForm(forms.ModelForm):
    username = forms.CharField(label='username', min_length=6, widget=forms.TextInput(attrs={
        'class': 'input', 'placeholder': 'input username'}))
    email = forms.EmailField(label='email address', min_length=6, widget=forms.EmailInput(attrs={
        'class': 'input', 'placeholder': 'email address'}))
    password = forms.CharField(label='input password', min_length=6, widget=forms.PasswordInput(attrs={
        'class': 'input', 'placeholder': 'input password'}))
    password1 = forms.CharField(label='input password again', min_length=6, widget=forms.PasswordInput(attrs={
        'class': 'input', 'placeholder': 'input password again'}))

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def clean_username(self):
        username = self.cleaned_data.get('username')
        exists = User.objects.filter(username=username).exists()
        if exists:
            raise forms.ValidationError("username already exists!")
        return username

    def clean_email(self):
        email = self.cleaned_data.get('email')
        exists = User.objects.filter(email=email).exists()
        if exists:
            raise forms.ValidationError("email address already exists!")
        return email

    def clean_password1(self):
        data = self.cleaned_data
        password = data['password']
        password1 = data['password1']
        if password != password1:
            raise forms.ValidationError('password input does not match, please check again')
        return password


class ForgetPasswordForm(forms.Form):
    # forms getting email address in forget password page
    email = forms.EmailField(label='Please Enter Your Email Address', min_length=4, widget=forms.EmailInput(attrs={
        'class': 'input', 'placeholder': '用户名/邮箱'
    }))


class ResetPasswordForm(forms.Form):
    # Change Password
    password = forms.CharField(label='输入新密码', min_length=6, widget=forms.PasswordInput(
        attrs={'class': 'input', 'placeholder': 'Input New Password'}))
