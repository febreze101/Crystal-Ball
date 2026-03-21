from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.test_supabase),
    path('boards/<int:board_id>/messages/', views.handle_board_messages),

]