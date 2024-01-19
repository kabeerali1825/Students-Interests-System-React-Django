from django.urls import path
from . import views

urlpatterns = [
    # path('', views.index, name='index'),
    path('all_students/', views.allStudents, name='all_students'),
    path('add_student/', views.addStudent, name='add_student'),
    path('delete_student/<int:pk>/', views.delStudent, name='delete_student'),
    path('update_student/<int:st_ID>/', views.update_student, name='update_student'),
    path('get_student/<int:pk>/', views.getStudent, name='get_student'),
    path('add_user/', views.addUser, name='add_user'),
]

