from django.db import models

class Usuario(models.Model):
    email = models.EmailField(primary_key=True, db_column='email')
    nome = models.CharField(max_length=150, db_column='nomeUsuario')
    password = models.CharField(max_length=88, db_column='senha')
    tipoUsuario = models.CharField(max_length=12, db_column='tipoUsuario')

    def __str__(self):
        return self.email

    class Meta:
        db_table = 'Usuario'
