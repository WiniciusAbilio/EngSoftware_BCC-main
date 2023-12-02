from django.db import models

class Filial(models.Model):
    idFilial = models.AutoField(primary_key=True, db_column='idFilial')
    nomeFilial = models.CharField(max_length=45, db_column='nomeFilial')
    cidade = models.CharField(max_length=45, db_column='cidade')
    estado = models.CharField(max_length=45, db_column='estado')

    def __str__(self):
        return self.nomeFilial
    
    class Meta:
        db_table = 'Filial'

