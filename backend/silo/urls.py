from django.urls import path
from . import views

urlpatterns = [
    path('processarCadastroSilo/', views.processar_cadastro_silo, name='processar_cadastro_silo'),
]
