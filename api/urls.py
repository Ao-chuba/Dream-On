from django.urls import path
from . import views

urlpatterns = [
    path('interpret-dream/', views.interpret_dream, name='interpret_dream'),  # Updated to use underscore
    path('donate/', views.donate_view, name='donate'),  # Donate endpoint
]
