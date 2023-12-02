import json
from django.http import JsonResponse
import jwt

def middlewareAcessoAdm(get_response):
    def middleware(request):
        token = request.headers.get('Authorization')  # Obtém o token JWT do cabeçalho Authorization
        if not token:
            return JsonResponse({"error": "Token JWT ausente"}, status=401)

        try:
            decoded_token = jwt.decode(token, 'chave_secreta', algorithms=['HS256'])
            # Verifique se o usuário é um administrador com base no conteúdo do token
            if decoded_token.get('usuario_tipo') == 'admin':
                response = get_response(request)
                return response
            else:
                return JsonResponse({"error": "Acesso não autorizado."}, status=403)

        except jwt.ExpiredSignatureError:
            return JsonResponse({"error": "Token JWT expirado"}, status=401)
        except jwt.InvalidTokenError:
            return JsonResponse({"error": "Token JWT inválido"}, status=401)

    return middleware
