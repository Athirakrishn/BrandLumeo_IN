from django.contrib.sitemaps import Sitemap

class StaticViewSitemap(Sitemap):
    priority = 0.8
    changefreq = "weekly"

    def items(self):
        return [
            "/",   # homepage
        ]

    def location(self, item):
        return item