# api/signals.py
from django.dispatch import receiver
from allauth.socialaccount.signals import social_account_added
from allauth.account.signals import user_signed_up
from django.core.mail import send_mail
from allauth.socialaccount.models import SocialAccount

# Handle new social account connections
@receiver(social_account_added)
def social_login_email(request, sociallogin, **kwargs):
    user = sociallogin.user
    send_welcome_email(user)

# Handle new user signups
@receiver(user_signed_up)
def new_user_signup(request, user, **kwargs):
    send_welcome_email(user)

def send_welcome_email(user):
    if user and user.email:
        send_mail(
            subject='Welcome to DreamOn!',
            message=f'Thank you {user.username or user.email.split("@")[0]}, for Using DreamOn🌠. We hope you enjoy the experience!🏵️',
            from_email='dreamon8787@gmail.com',
            recipient_list=[user.email],
            fail_silently=False,
        )