import json
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect
from .models import Filial
from silo.models import Silo
from backend.middlewares.middleware import middlewareAcessoAdm


@middlewareAcessoAdm
def listar_filiais(request):
    # Obtém todas as filiais do banco de dados
    filiais = Filial.objects.all()
    
    # Converte os dados das filiais para um formato JSON
    filiais_data = [
        {'idFilial': filial.idFilial, 'nomeFilial': filial.nomeFilial, 'cidade': filial.cidade, 'estado': filial.estado}
        for filial in filiais
    ]
    # Retorna a lista de filiais como JSON
    return JsonResponse(filiais_data, safe=False)

@middlewareAcessoAdm
def atualizar_filial(request):
    data = json.loads(request.body)

    id = data.get('id')

    filial = get_object_or_404(Filial, idFilial=id)

    # Obtém os dados do corpo da requisição

    # Atualiza os campos da filial
    filial.nomeFilial = data.get('nomeFilial', filial.nomeFilial)
    filial.estado = data.get('estado', filial.estado)
    filial.cidade = data.get('cidade', filial.cidade)

    # Salva a filial no banco de dados
    filial.save()

    return JsonResponse({'mensagem': f'Filial com ID {id} atualizada com sucesso.'})

@middlewareAcessoAdm
def deletar_filial(request):
    data = json.loads(request.body)
    # Encontrar a filial pelo ID
    id = data.get('id')

    filial = Filial.objects.get(idFilial=id)

    # Excluir silos associados
    Silo.objects.filter(Filial_idFilial=id).delete()

    # Agora, você pode excluir a filial sem violar a restrição de chave estrangeira
    filial.delete()

    return JsonResponse({'mensagem': f'Filial com ID {id} excluída com sucesso.'})

@middlewareAcessoAdm
def processar_cadastro_filial(request):
    if request.method == 'POST':
        nome = request.POST.get('nomeFilial')
        estado = request.POST.get('estado')
        cidade = request.POST.get('cidade')

        # Crie um novo usuário no banco de dados
        filial = Filial(nomeFilial=nome, cidade=cidade, estado=estado)
        filial.save()
        
        # Redirecione para uma página de sucesso ou outra página relevante
        return JsonResponse({'mensagem': 'Filial cadastrada com sucesso'}, status=200)

