from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('services/', views.services_page, name='services'),
    path('services/<slug:slug>/', views.service_detail_page, name='service_detail'),
    path('about/', views.about_page, name='about'),
    path('portfolio/', views.portfolio_page, name='portfolio'),
    path('blog/', views.blog_page, name='blog'),
    path('contact/', views.contact_page, name='contact'),
    path('thank-you/', views.thank_you_page, name='thank_you'),
    path('privacy/', views.privacy_page, name='privacy'),
    path('terms/', views.terms_page, name='terms'),
    path('cookies/', views.cookies_page, name='cookies'),
    path("digital-marketing-agency-calicut/", views.calicut, name="calicut_seo"),
    path("digital-marketing-agency-kerala/", views.seo_kerala, name="seo_kerala"),
    path("digital-marketing-agency-uae/", views.seo_uae, name="seo_uae"),
]
