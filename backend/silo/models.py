from django.db import models

from filial.models import Filial

class Silo(models.Model):
    idSilo = models.AutoField(primary_key=True, db_column='idSilo')
    nomeSilo = models.CharField(max_length=45, db_column='nomeSilo', blank=False, null=False)
    Filial_idFilial = models.IntegerField(db_column='Filial_idFilial')

    def __str__(self):
        return self.nomeSilo
    
    class Meta:
        db_table = 'Silo'

