import json
from django.http import JsonResponse
from filial.models import Filial
from .models import Silo
from backend.middlewares.middleware import middlewareAcessoAdm


@middlewareAcessoAdm
def processar_cadastro_silo(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Obtenha os dados do formulário
        idFilial = data.get('idFilial')
        nome = data.get('nomeSilo')

        # Crie um novo usuário no banco de dados
        silo = Silo(nomeSilo=nome, Filial_idFilial=idFilial)
        silo.save()
        
        # Redirecione para uma página de sucesso ou outra página relevante
        return JsonResponse({'mensagem': 'Silo cadastrado com sucesso'}, status=200)

