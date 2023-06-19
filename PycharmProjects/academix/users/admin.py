from django.contrib import admin

# Register your models here.
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from .models import UserProfile
from .models import EmailVerifyRecord

# unregister User
admin.site.unregister(User)


class UserProfileInline(admin.StackedInline):
    model = UserProfile


# link User and UserProfile
class UserProfileAdmin(UserAdmin):
    inlines = [UserProfileInline]


# register User again
admin.site.register(User, UserProfileAdmin)


@admin.register(EmailVerifyRecord)
class EmailVerifyRecordAdmin(admin.ModelAdmin):
    # Admin View for EmailVerifyRecord

    list_display = ('code',)