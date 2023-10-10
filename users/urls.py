from django.urls import path
from users import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('signup/', views.UserView.as_view(), name='user_view'),
    path('login/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('mock/', views.MockView.as_view(), name='mock_view'),
    path('<int:user_id>/myprofile/', views.MyProfileView.as_view(), name='my_profile_view'),
    path('<int:user_id>/profile/', views.ProfileView.as_view(), name='profile_view'),
]
