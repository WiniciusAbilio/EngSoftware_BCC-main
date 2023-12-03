from django.urls import path
from . import views

urlpatterns = [
    path('processarCadastroSilo/', views.processar_cadastro_silo, name='processar_cadastro_silo'),
    path('listarSilo/', views.listar_silos, name='listar_silos'),
    path('atualizarSilo/', views.atualizar_silos, name='atualizar_silos'),
    path('deletarSilo/', views.deletar_silos, name='deletar_silos'),
]
