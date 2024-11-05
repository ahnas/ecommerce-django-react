from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=100,unique=True)
    price = models.IntegerField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='items/', blank=True, null=True)  


    def __str__(self):
        return self.name