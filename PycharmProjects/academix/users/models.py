from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class UserProfile(models.Model):
    USER_GENDER_TYPE = (('male', 'male'),
                        ('female', 'female'))
    USER_ROLE_TYPE = (('teacher', 'teacher'),
                      ('student', 'student'))

    owner = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name='users')
    nike_name = models.CharField('nickname', max_length=50, blank=True, default='')
    birthday = models.DateField('birthday', null=True, blank=True)
    gender = models.CharField('gender', max_length=6, choices=USER_GENDER_TYPE, default='male')
    role = models.CharField('role', max_length=7, choices=USER_ROLE_TYPE, default='teacher')
    address = models.CharField('address', max_length=100, blank=True, default='')
    image = models.ImageField(upload_to='images/%Y/%m', default='images/default.png', max_length=100,
                              verbose_name='photo')
