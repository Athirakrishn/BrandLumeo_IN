import urllib.parse
import logging

from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.http import Http404
from .models import Service, HeroSection
from .service_catalog import get_service_sections, get_service_map

logger = logging.getLogger(__name__)


def home(request):
    context = {
        "services": Service.objects.all(),
        "hero": HeroSection.objects.first()
    }
    return render(request, "website/index.html", context)


def services_page(request):
    context = {
        "service_sections": get_service_sections(),
    }
    return render(request, "website/services.html", context)


def service_detail_page(request, slug):
    service_map = get_service_map()
    service = service_map.get(slug)
    if not service:
        raise Http404("Service not found")

    context = {
        "service": service,
    }
    return render(request, "website/service_detail.html", context)


def about_page(request):
    return render(request, "website/about.html")


def portfolio_page(request):
    return render(request, "website/portfolio.html")


def blog_page(request):
    return render(request, "website/blog.html")


def contact_page(request):
    if request.method == "POST":
        name = request.POST.get("name", "").strip()
        email = request.POST.get("email", "").strip()
        company = request.POST.get("company", "").strip()
        message = request.POST.get("message", "").strip()

        if name and email and message:
            mail_subject = f"New Contact Form Submission from {name}"
            
            mail_body = f"Name: {name}\nEmail: {email}\n"
            if company:
                mail_body += f"Company: {company}\n"
            mail_body += f"\nMessage:\n{message}"

            target_email = "info@brandlumeo.com"
            
            try:
                send_mail(
                    subject=mail_subject,
                    message=mail_body,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[target_email],
                    fail_silently=False,
                )
                return redirect("thank_you")
            except Exception:
                logger.exception("Contact form email send failed")
                messages.error(
                    request,
                    "We could not send your message right now. Please try again in a few minutes.",
                )
                return render(request, "website/contact.html")

        messages.error(request, "Please fill out your name, email, and message.")

    return render(request, "website/contact.html")


def thank_you_page(request):
    return render(request, "website/thank_you.html")


def privacy_page(request):
    return render(request, "website/privacy.html")


def terms_page(request):
    return render(request, "website/terms.html")


def cookies_page(request):
    return render(request, "website/cookies.html")


def calicut(request):
    return redirect("/", permanent=True)


def seo_kerala(request):
    return redirect("/", permanent=True)


def seo_uae(request):
    return redirect("/", permanent=True)
