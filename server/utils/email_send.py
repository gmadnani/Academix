from users.models import EmailVerifyRecord
from django.core.mail import send_mail
import random
import string


def random_str(random_length=6):
    # Generate from 0-9
    chars = string.digits
    str_code = ''.join(random.sample(chars, random_length))
    return str_code


def send_register_email(email, send_type='register'):
    email_record = EmailVerifyRecord()
    code = random_str()
    email_record.code = code
    email_record.email = email
    email_record.send_type = send_type
    email_record.save()

    # sending code to the specified email address
    if send_type == 'register':
        email_title = 'Verification Code For Register From Academix'
        email_body = 'Please use the following link to activate your code：http://127.0.0.1:8000/users/activate/{0}'.\
            format(code)

        send_status = send_mail(email_title, email_body, 'academix673@gmail.com', [email])
        if send_status:
            pass
    elif send_type == 'forget':
        email_title = 'Verification Code For Resetting your password'
        email_body = 'Please use the following link to reset password：http://127.0.0.1:8000/users/reset_password/{0}'.\
            format(code)

        send_status = send_mail(email_title, email_body, 'academix673@gmail.com', [email])
        if send_status:
            pass

