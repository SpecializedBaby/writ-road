from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from .views import CreateUserView, ManageUserView

app_name = "apps.accounts"

urlpatterns = [
    path('create/', CreateUserView.as_view(), name="create_user"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('me/', ManageUserView.as_view(), name="get_user")
]
