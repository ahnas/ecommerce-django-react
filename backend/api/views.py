from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Item, ItemImage
from .serializers import ItemSerializer, ItemImageSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    parser_classes = [MultiPartParser, FormParser]

    @action(detail=True, methods=['get'], url_path='images')
    def get_images(self, request, pk=None):
        item = self.get_object()
        images = item.images.all()
        serializer = ItemImageSerializer(images, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], url_path='upload-images')
    def upload_images(self, request, pk=None):
        item = self.get_object() 
        images = request.FILES.getlist('images')
        uploaded_images = []
        for img in images:
            item_image = ItemImage(item=item, image=img)
            item_image.save()
            uploaded_images.append(ItemImageSerializer(item_image).data)

        return Response(uploaded_images, status=201)
