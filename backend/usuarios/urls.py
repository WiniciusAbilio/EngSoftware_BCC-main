from django.urls import path
from . import views

urlpatterns = [
    path('processarLogin/', views.processar_login, name='processar_login'),
    path('processarCadastroUsuario/', views.processar_cadastro_usuario, name='processar_cadastro_usuario'),
    path('listarUsuario/', views.listar_usuarios, name='listar_usuarios'),
    path('atualizarUsuario/', views.atualizar_usuario, name='atualizar_suario'),
    path('deletarUsuario/', views.deletar_usuario, name='deletar_usuario')
]
