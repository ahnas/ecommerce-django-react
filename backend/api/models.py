from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=255,unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


class ItemImage(models.Model):
    item = models.ForeignKey(Item, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='item_images/', blank=True, null=True)

    def __str__(self):
        return f"Image for {self.item.name}"