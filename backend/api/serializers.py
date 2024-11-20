from rest_framework import serializers
from .models import Item, ItemImage

class ItemImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemImage
        fields = ['id', 'image','item']

class ItemSerializer(serializers.ModelSerializer):
    images = ItemImageSerializer(many=True,required=False)

    class Meta:
        model = Item
        fields = ['id', 'name', 'description', 'price', 'images']
