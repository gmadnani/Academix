from django.test import TestCase
from unittest.mock import patch
from .email_send import send_register_email

# python manage.py test
# python manage.py test utils

# Activation Code
class EmailSendTestCase(TestCase):
    # create mock variables for send_mail and random_str
    @patch('utils.email_send.random_str')
    @patch('utils.email_send.send_mail')
    def test_send_register_email(self, mock_send_mail, mock_random_str):
        print("--Email Send Test Cases--")
        email = 'test@example.com'
        code = 'example_code'  
        mock_random_str.return_value = code
        
        # test for send_type = 'register'
        print("Test: Email Send Type - Register")
        send_register_email(email, send_type='register')

        mock_send_mail.assert_called_once_with(
            'Verification Code For Register From Academix',
            'Please use the following link to activate your code: http://127.0.0.1:8000/users/activate/{0}'.format(code),
            'academix673@gmail.com',
            [email]
        )

        # test for send_type = 'forget'
        print("Test: Email Send Type - Forgot Password")
        send_register_email(email, send_type='forget')

        mock_send_mail.assert_called_with(
            'Verification Code For Resetting your password',
            'Please use the following link to reset password: http://127.0.0.1:8000/users/reset_password/{0}'.format(code),
            'academix673@gmail.com',
            [email]
        )