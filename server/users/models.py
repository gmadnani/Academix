from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from rest_framework.authtoken.models import Token
# Create your models here.


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def generate_token(sender, instance=None, created=False, **kwargs):
    """
    :param sender:
    :param instance:
    :param created:
    :param kwargs:
    :return:
    """
    if created:
        Token.objects.create(user=instance)
        UserProfile.objects.create(owner=instance)
        if instance.is_superuser:
            userprofile_object = UserProfile.objects.get(owner=instance)
            userprofile_object.role = 'admin'
            userprofile_object.save()


class UserProfile(models.Model):
    USER_GENDER_TYPE = (('male', 'male'),
                        ('female', 'female'))
    USER_ROLE_TYPE = (('teacher', 'teacher'),
                      ('student', 'student'),
                      ('admin', 'admin'))

    owner = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name='users')
    full_name = models.CharField('nickname', max_length=50, blank=True, default='')
    birthday = models.DateField('birthday', null=True, blank=True, default='2020-01-01')
    gender = models.CharField('gender', max_length=6, choices=USER_GENDER_TYPE, default='male')
    role = models.CharField('role', max_length=7, choices=USER_ROLE_TYPE, default='student')
    address = models.CharField('address', max_length=100, blank=True, default='')
    image = models.ImageField(upload_to='images/%Y/%m', default='images/default.png', max_length=100,
                              verbose_name='photo')

    def __str__(self):
        return self.owner.username


class EmailVerifyRecord(models.Model):
    # email verification record
    SEND_TYPE_CHOICES = (
        ('register', 'register'),
        ('forget', 'forget'),
    )

    code = models.CharField('Verification Code', max_length=20)
    email = models.EmailField('Email Address', max_length=50)
    send_type = models.CharField(choices=SEND_TYPE_CHOICES, max_length=10, default='register')
    send_time = models.DateTimeField('time', auto_now_add=True)

    class Meta:
        verbose_name = 'email verification code'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.code
