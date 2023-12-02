from django.urls import path
from . import views

urlpatterns = [
    path('processarCadastroFilial/', views.processar_cadastro_filial, name='processar_cadastro_filial'),
    path('listarFilial/', views.listar_filiais, name='listar_filiais'),
    path('atualizarFilial/', views.atualizar_filial, name='atualizar_filial'),
    path('deletarFilial/', views.deletar_filial, name='deletar_filial')
]
