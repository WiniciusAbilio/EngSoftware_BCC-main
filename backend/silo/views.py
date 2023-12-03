import json
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from filial.models import Filial
from .models import Silo
from backend.middlewares.middleware import middlewareAcessoAdm

@middlewareAcessoAdm
def atualizar_silos(request):
    data = json.loads(request.body)

    id = data.get('id')

    silo = get_object_or_404(Silo, idSilo=id)

    # Atualiza os campos do silo
    silo.nomeSilo = data.get('nomeSilo', silo.nomeSilo)
    # Adicione outros campos que deseja atualizar

    # Salva o silo no banco de dados
    silo.save()

    return JsonResponse({'mensagem': f'Silo com ID {id} atualizado com sucesso.'})

@middlewareAcessoAdm
def listar_silos(request):
    if request.method == 'GET':
        # Obtém todos os silos do banco de dados
        silos = Silo.objects.all()

        # Formata os dados no formato desejado
        formatted_silos = []

        for silo in silos:
            filial_id = silo.Filial_idFilial  # Obtém o ID da Filial do Silo
            filial_nome = Filial.objects.get(idFilial=filial_id).nomeFilial  # Obtém o nome da Filial usando a consulta ao modelo Filial

            formatted_silos.append({
                "idSilo": silo.idSilo,
                "idFilial": filial_id,
                "nomeSilo": silo.nomeSilo,
                "nomeFilial": filial_nome,
            })

        # Retorna os dados formatados em formato JSON
        return JsonResponse({"silos": formatted_silos}, status=200)


@middlewareAcessoAdm
def deletar_silos(request):
    data = json.loads(request.body)
    # Encontrar o silo pelo ID
    id = data.get('id')

    silo = get_object_or_404(Silo, idSilo=id)

    # Excluir o silo
    silo.delete()

    return JsonResponse({'mensagem': f'Silo com ID {id} excluído com sucesso.'})

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

