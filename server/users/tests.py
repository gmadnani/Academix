from django.test import TestCase
from .forms import RegisterForm, LoginForm

# python manage.py test
# python manage.py test users

# Register Form
class RegisterFormTestCase(TestCase):
    def test_valid_register_form(self):
        # dummy form data, success case
        form_data = {
            'username': 'username',
            'email': 'student@university.com',
            'password': 'rightpassword',
            'password1': 'rightpassword',
        }
        form = RegisterForm(data=form_data)
        # if not form.is_valid(): 
        #    print(form.errors)  # more error details
        self.assertTrue(form.is_valid())

    def test_invalid_register_form(self):
        # dummy form data, fail case
        form_data = {
            'username': 'username',
            'email': 'student@university.com',
            'password': 'rightpassword',
            'password1': 'wrongpassword'
        }
        form = RegisterForm(data=form_data)
        self.assertFalse(form.is_valid())

# Login Form
class LoginFormTestCase(TestCase):
    def test_valid_login_form(self):
        # dummy form data, success case
        form_data = {
            'username': 'username',
            'password': 'mypassw0rd'
        }
        form = LoginForm(data=form_data)
        self.assertTrue(form.is_valid())

    def test_invalid_login_form(self):
        # dummy form data, fail case
        form_data = {
            'username': '',
            'password': 'password'
        }
        form = LoginForm(data=form_data)
        self.assertFalse(form.is_valid())
