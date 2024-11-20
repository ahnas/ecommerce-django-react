from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet,ImageViewSet

router = DefaultRouter()
router.register(r'items', ItemViewSet)
router.register(r'images', ImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
