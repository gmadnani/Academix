from django.contrib import admin

# Register your models here.
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from .models import UserProfile

# unregister User
admin.site.unregister(User)


class UserProfileInline(admin.StackedInline):
    model = UserProfile


# link User and UserProfile
class UserProfileAdmin(UserAdmin):
    inlines = [UserProfileInline]


# register User again
admin.site.register(User, UserProfileAdmin)
