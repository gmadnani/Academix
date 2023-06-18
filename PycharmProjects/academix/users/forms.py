from django import forms


class LoginForm(forms.Form):
    username = forms.CharField(label='username', max_length=15, widget=forms.TextInput(attrs={
        'class': 'input', 'placeholder': 'Username'
    }))
    password = forms.CharField(label='password', min_length=6, widget=forms.PasswordInput(attrs={
        'class': 'input', 'placeholder': 'Password'
    }))