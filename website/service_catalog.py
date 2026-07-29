from pathlib import Path

from django.conf import settings


SERVICE_SECTIONS = [
    {
        "id": "branding-services",
        "name": "Branding Services",
        "quick_label": "Branding",
        "image": "/static/images/services/logo_design.jpg",
        "services": [
            {
                "slug": "logo-design",
                "title": "Logo Design",
                "image": "/static/images/services/logo_design.jpg",
                "short_description": "Memorable logo concepts crafted for digital and print use.",
                "description": "We design distinctive logo systems that communicate brand personality at a glance. Every concept is built for versatility across websites, social media, stationery, packaging, and ads.",
                "highlights": ["Discovery-led concepting", "Multiple export formats", "Scalable vector delivery"],
            },
            {
                "slug": "brand-identity-development",
                "title": "Brand Identity Development",
                "image": "/static/images/services/branding-identity.jpg",
                "short_description": "A complete visual identity aligned to your business goals.",
                "description": "Our team builds a cohesive visual language that includes typography, color systems, icon style, and layout principles. The identity is designed to keep every customer touchpoint consistent and recognizable.",
                "highlights": ["Visual direction workshops", "Color and typography systems", "Consistent cross-channel execution"],
            },
            {
                "slug": "brand-strategy-positioning",
                "title": "Brand Strategy & Positioning",
                "image": "/static/images/services/subsections/brand-strategy-positioning.jpg",
                "short_description": "Strategic positioning that differentiates your brand in market.",
                "description": "We define your competitive position, messaging pillars, and brand promise to help your business stand out in crowded categories. The output gives your team a clear direction for campaigns and communication.",
                "highlights": ["Audience and competitor mapping", "Messaging architecture", "Positioning clarity for growth"],
            },
            {
                "slug": "brand-guidelines-creation",
                "title": "Brand Guidelines Creation",
                "image": "/static/images/services/subsections/brand-guidelines-creation.jpg",
                "short_description": "Practical brand guidelines for teams and partners.",
                "description": "We document your full brand system in a clear guide so internal teams and external vendors can execute consistently. This reduces design drift and speeds up approvals.",
                "highlights": ["Usage rules and examples", "Digital and print standards", "Easy handoff documentation"],
            },
            {
                "slug": "rebranding-services",
                "title": "Rebranding Services",
                "image": "/static/images/services/subsections/rebranding-services.jpg",
                "short_description": "Modernize your brand while preserving recognition.",
                "description": "Our rebranding process helps you evolve your identity for new markets, products, or business goals. We balance familiarity and fresh direction to minimize customer confusion.",
                "highlights": ["Brand audit and gap analysis", "Evolution or full refresh options", "Rollout support across channels"],
            },
            {
                "slug": "corporate-branding",
                "title": "Corporate Branding",
                "image": "/static/images/services/subsections/corporate-branding.jpg",
                "short_description": "Professional brand systems built for business credibility.",
                "description": "We create polished corporate branding assets that support investor confidence, client trust, and internal alignment. This includes visual identity adaptation for presentations, reports, and corporate media.",
                "highlights": ["B2B-ready design language", "Sales and investor collateral styling", "Brand consistency for enterprise communication"],
            },
            {
                "slug": "packaging-design",
                "title": "Packaging Design",
                "image": "/static/images/services/subsections/packaging-design.jpg",
                "short_description": "Shelf-ready packaging that drives attention and purchase.",
                "description": "We design packaging that balances aesthetics, usability, and brand recall. Each concept is optimized to stand out in retail and online marketplaces while meeting practical production needs.",
                "highlights": ["Consumer-focused pack design", "Print-ready file setup", "Label hierarchy and compliance support"],
            },
            {
                "slug": "visual-identity-systems",
                "title": "Visual Identity Systems",
                "image": "/static/images/services/subsections/visual-identity-systems.jpg",
                "short_description": "Structured visual systems for scalable brand growth.",
                "description": "We build modular identity components that keep your brand coherent as you launch campaigns, products, and sub-brands. The system is designed for long-term usability and quick creative production.",
                "highlights": ["Modular design components", "Scalable templates", "Campaign-ready visual consistency"],
            },
        ],
    },
    {
        "id": "digital-marketing-services",
        "name": "Digital Marketing Services",
        "quick_label": "Digital Marketing",
        "image": "/static/images/services/digital-marketing.jpg",
        "services": [
            {
                "slug": "search-engine-optimization-seo",
                "title": "Search Engine Optimization (SEO)",
                "image": "/static/images/services/subsections/search-engine-optimization-seo.jpg",
                "short_description": "Technical and content SEO to improve rankings and qualified traffic.",
                "description": "We optimize your website for discoverability, relevance, and authority through on-page SEO, technical fixes, content strategy, and link development. The focus is long-term visibility and stable organic lead flow.",
                "highlights": ["On-page and technical optimization", "Local and ecommerce SEO workflows", "Keyword-driven content planning"],
            },
            {
                "slug": "ppc-advertising",
                "title": "PPC Advertising",
                "image": "/static/images/services/subsections/ppc-advertising.jpg",
                "short_description": "Performance ad campaigns across Google, Meta, and more.",
                "description": "Our PPC team builds and manages paid campaigns focused on measurable return. From account structure to ad creatives and bidding strategy, we optimize for lower acquisition cost and higher conversion quality.",
                "highlights": ["Google, Meta, LinkedIn, YouTube ads", "Conversion-focused campaign setup", "Budget and bid optimization"],
            },
            {
                "slug": "social-media-marketing",
                "title": "Social Media Marketing",
                "image": "/static/images/services/subsections/social-media-marketing.jpg",
                "short_description": "Platform-native content and growth strategy for social channels.",
                "description": "We develop social strategies that improve engagement, reach, and brand trust across key platforms. Our approach combines calendar planning, creative direction, and community management.",
                "highlights": ["Content calendar and campaign planning", "Community and reputation management", "Influencer collaboration workflows"],
            },
            {
                "slug": "performance-marketing",
                "title": "Performance Marketing",
                "image": "/static/images/services/subsections/performance-marketing.jpg",
                "short_description": "Data-led growth campaigns optimized for revenue outcomes.",
                "description": "We run full-funnel performance programs that connect traffic, lead quality, and sales outcomes. Continuous experimentation and conversion optimization are used to improve marketing efficiency over time.",
                "highlights": ["Lead generation funnel design", "A/B testing and CRO", "Attribution and performance analytics"],
            },
        ],
    },
    {
        "id": "content-creation-services",
        "name": "Content Creation Services",
        "quick_label": "Content",
        "image": "/static/images/services/content.jpg",
        "services": [
            {
                "slug": "social-media-post-design",
                "title": "Social Media Post Design",
                "image": "/static/images/services/subsections/social-media-post-design.jpg",
                "short_description": "High-quality post creatives tailored to each social platform.",
                "description": "We design branded social posts that communicate quickly and encourage interaction. Every visual is adapted for platform dimensions and audience behavior.",
                "highlights": ["Platform-specific design formats", "Branded visual consistency", "Engagement-focused creative layouts"],
            },
            {
                "slug": "ad-creatives-static-video",
                "title": "Ad Creatives (Static & Video)",
                "image": "/static/images/services/subsections/ad-creatives-static-video.jpg",
                "short_description": "Conversion-focused ad creative production for paid campaigns.",
                "description": "We create static and video ad assets built around clear hooks, compelling offers, and performance testing. Creative variants are developed to support scaling and optimization.",
                "highlights": ["Creative concepts for different funnel stages", "Static, carousel, and video formats", "Performance testing variations"],
            },
            {
                "slug": "video-editing-reels",
                "title": "Video Editing & Reels",
                "image": "/static/images/services/subsections/video-editing-reels.jpg",
                "short_description": "Fast-paced edits built for reels, shorts, and social video.",
                "description": "Our editors craft short-form videos that hold attention and drive engagement. We optimize pacing, captions, transitions, and hooks for strong retention.",
                "highlights": ["Short-form platform optimization", "Caption and hook enhancement", "Brand-consistent edit styles"],
            },
            {
                "slug": "promotional-videos",
                "title": "Promotional Videos",
                "image": "/static/images/services/subsections/promotional-videos.jpg",
                "short_description": "Brand and product promos designed to support campaigns.",
                "description": "We produce promotional videos that communicate value clearly and quickly. These assets are structured to support launch campaigns, ads, and website conversion goals.",
                "highlights": ["Campaign and launch storytelling", "Script-to-edit production flow", "Multi-platform export delivery"],
            },
            {
                "slug": "website-content-writing",
                "title": "Website Content Writing",
                "image": "/static/images/services/subsections/website-content-writing.jpg",
                "short_description": "Website copy that improves clarity, trust, and conversion.",
                "description": "We write user-focused website content that explains your offer, removes friction, and guides action. The copy framework aligns with SEO and brand tone.",
                "highlights": ["Page-level messaging strategy", "Conversion-oriented copy structure", "SEO-aligned website writing"],
            },
            {
                "slug": "blog-article-writing",
                "title": "Blog & Article Writing",
                "image": "/static/images/services/subsections/blog-article-writing.jpg",
                "short_description": "Authority-building blog content optimized for discovery.",
                "description": "Our team creates informative, keyword-targeted articles that answer user intent and strengthen topical authority. This supports both organic traffic and brand credibility.",
                "highlights": ["Keyword and topic research", "Editorial planning and production", "Readable and search-optimized structure"],
            },
            {
                "slug": "product-descriptions",
                "title": "Product Descriptions",
                "image": "/static/images/services/subsections/product-descriptions.jpg",
                "short_description": "Persuasive product copy that improves ecommerce conversion.",
                "description": "We write product descriptions that combine features, benefits, and trust elements to improve purchase confidence. Copy is tailored for marketplace and website environments.",
                "highlights": ["Feature-to-benefit positioning", "Marketplace-friendly formatting", "Conversion-focused product copy"],
            },
            {
                "slug": "script-writing-copywriting",
                "title": "Script Writing & Copywriting",
                "image": "/static/images/services/subsections/script-writing-copywriting.jpg",
                "short_description": "Clear, persuasive scripts and campaign copy for growth.",
                "description": "We develop scripts and copy for ads, videos, landing pages, and campaigns with a strong focus on clarity and action. Messaging is adapted to audience intent and channel behavior.",
                "highlights": ["Cross-channel campaign copy", "Video and ad scripting", "Tone-of-voice consistency"],
            },
        ],
    },
    {
        "id": "website-development-services",
        "name": "Website Development Services",
        "quick_label": "Website",
        "image": "/static/images/services/website.jpg",
        "services": [
            {
                "slug": "custom-website-design",
                "title": "Custom Website Design",
                "image": "/static/images/services/subsections/custom-website-design.jpg",
                "short_description": "Bespoke website designs aligned to your brand and goals.",
                "description": "We design custom websites that reflect your brand identity and support your business objectives. Layout, interaction, and content hierarchy are structured for usability and conversion.",
                "highlights": ["Brand-led UI design", "Conversion-oriented page structure", "Mobile and desktop optimization"],
            },
            {
                "slug": "responsive-website-development",
                "title": "Responsive Website Development",
                "image": "/static/images/services/subsections/responsive-website-development.jpg",
                "short_description": "Websites that perform smoothly across all screen sizes.",
                "description": "We build responsive websites that deliver a consistent user experience on mobile, tablet, and desktop devices. Performance and maintainability are prioritized from the start.",
                "highlights": ["Device-adaptive layout systems", "Fast loading implementation", "Cross-browser compatibility"],
            },
            {
                "slug": "corporate-websites",
                "title": "Corporate Websites",
                "image": "/static/images/services/subsections/corporate-websites.jpg",
                "short_description": "Professional corporate sites built for trust and authority.",
                "description": "Our corporate website solutions help businesses present services, credibility, and capabilities with clarity. The architecture is tailored for enterprise communication and lead generation.",
                "highlights": ["Structured service presentation", "Trust and compliance-ready pages", "Lead capture integration"],
            },
            {
                "slug": "portfolio-websites",
                "title": "Portfolio Websites",
                "image": "/static/images/services/subsections/portfolio-websites.jpg",
                "short_description": "Showcase-focused portfolio sites for creators and agencies.",
                "description": "We create portfolio websites that highlight work quality, process, and outcomes with strong visual storytelling. The design emphasizes clarity, speed, and credibility.",
                "highlights": ["Project-focused storytelling", "Visual-first layouts", "Contact and inquiry optimization"],
            },
            {
                "slug": "landing-pages",
                "title": "Landing Pages",
                "image": "/static/images/services/subsections/landing-pages.jpg",
                "short_description": "High-converting landing pages for campaigns and offers.",
                "description": "We build focused landing pages designed to drive a single conversion goal, whether leads, signups, or sales. Messaging, layout, and form flow are optimized through best practices.",
                "highlights": ["Single-goal conversion architecture", "Funnel-aligned messaging", "Testing-ready page structures"],
            },
            {
                "slug": "ecommerce-development",
                "title": "E-commerce Development",
                "image": "/static/images/services/subsections/ecommerce-development.jpg",
                "short_description": "Scalable ecommerce stores with streamlined buying flows.",
                "description": "We develop ecommerce platforms that support product discovery, trust, and smooth checkout experiences. The store is optimized for performance, conversion, and growth.",
                "highlights": ["Catalog and product UX setup", "Checkout flow optimization", "Payment and shipping integration"],
            },
            {
                "slug": "cms-development",
                "title": "CMS Development",
                "image": "/static/images/services/subsections/cms-development.jpg",
                "short_description": "Content-managed websites for faster internal updates.",
                "description": "We implement CMS-driven websites so your team can update pages, blogs, and media without developer dependency. Admin workflows are kept simple and secure.",
                "highlights": ["Editor-friendly admin workflows", "Custom content structures", "Secure role-based access"],
            },
            {
                "slug": "website-redesign",
                "title": "Website Redesign",
                "image": "/static/images/services/subsections/website-redesign.jpg",
                "short_description": "Complete website refresh for improved UX and performance.",
                "description": "We redesign outdated websites to improve visual quality, usability, and conversion outcomes. The process includes content alignment, UI modernization, and technical cleanup.",
                "highlights": ["UX and design modernization", "Content and layout restructuring", "Performance and accessibility improvements"],
            },
            {
                "slug": "website-maintenance-support",
                "title": "Website Maintenance & Support",
                "image": "/static/images/services/subsections/website-maintenance-support.jpg",
                "short_description": "Ongoing support to keep your website secure and updated.",
                "description": "Our maintenance plans cover updates, monitoring, troubleshooting, and technical support to ensure your site stays healthy. We focus on uptime, security, and continuity.",
                "highlights": ["Routine updates and patches", "Issue monitoring and fixes", "Backup and recovery support"],
            },
            {
                "slug": "web-application-development",
                "title": "Web Application Development",
                "image": "/static/images/services/subsections/web-application-development.jpg",
                "short_description": "Custom web applications tailored to business workflows.",
                "description": "We build web apps that solve operational challenges with scalable architecture and clean interfaces. From dashboards to custom portals, solutions are built around real business use.",
                "highlights": ["Custom workflow mapping", "Secure and scalable architecture", "API-ready application foundations"],
            },
        ],
    },
    {
        "id": "mobile-app-services",
        "name": "Mobile App Development Services",
        "quick_label": "Mobile App",
        "image": "/static/images/services/mobile-app.jpg",
        "services": [
            {
                "slug": "android-app-development",
                "title": "Android App Development",
                "image": "/static/images/services/subsections/android-app-development.jpg",
                "short_description": "Native and scalable Android apps built for performance.",
                "description": "We create Android applications with user-centered interfaces and reliable performance across supported devices. Development emphasizes stability, security, and maintainable code.",
                "highlights": ["Android-first architecture", "Store-ready deployment support", "Scalable app performance"],
            },
            {
                "slug": "ios-app-development",
                "title": "iOS App Development",
                "image": "/static/images/services/subsections/ios-app-development.jpg",
                "short_description": "High-quality iOS applications designed for Apple users.",
                "description": "Our iOS development services focus on polished UX, efficient performance, and dependable release practices. We help businesses ship apps that meet platform standards.",
                "highlights": ["Apple ecosystem best practices", "Smooth UI and motion design", "App Store submission support"],
            },
            {
                "slug": "hybrid-app-development",
                "title": "Hybrid App Development",
                "image": "/static/images/services/subsections/hybrid-app-development.jpg",
                "short_description": "Hybrid apps that reduce cost while reaching more users.",
                "description": "We build hybrid applications that deliver cross-device reach with efficient development cycles. This approach is ideal for businesses balancing budget, speed, and functionality.",
                "highlights": ["Shared codebase efficiency", "Multi-platform app rollout", "Rapid iteration capability"],
            },
            {
                "slug": "cross-platform-development",
                "title": "Cross Platform Development",
                "image": "/static/images/services/subsections/cross-platform-development.jpg",
                "short_description": "Single-codebase app development for Android and iOS.",
                "description": "Our cross-platform process helps launch apps on multiple platforms while preserving quality and user experience. We optimize architecture for maintainability and feature growth.",
                "highlights": ["Unified build strategy", "Consistent UX across platforms", "Faster release cycles"],
            },
            {
                "slug": "mobile-ui-ux-design",
                "title": "UI/UX Design",
                "image": "/static/images/services/subsections/mobile-ui-ux-design.jpg",
                "short_description": "Mobile-first UI/UX focused on usability and retention.",
                "description": "We design app interfaces and user flows that reduce friction and improve engagement. Research-backed wireframes and prototypes guide development decisions.",
                "highlights": ["User flow planning", "Interactive prototype delivery", "Design systems for mobile products"],
            },
            {
                "slug": "app-testing",
                "title": "App Testing",
                "image": "/static/images/services/subsections/app-testing.jpg",
                "short_description": "Comprehensive testing to ensure app reliability and quality.",
                "description": "We run structured testing for functionality, usability, compatibility, and performance so your app launches with confidence. QA coverage is aligned with product priorities.",
                "highlights": ["Functional and regression testing", "Device and compatibility checks", "Performance and stability validation"],
            },
            {
                "slug": "app-maintenance-updates",
                "title": "App Maintenance & Updates",
                "image": "/static/images/services/subsections/app-maintenance-updates.jpg",
                "short_description": "Post-launch app updates and ongoing support services.",
                "description": "Our maintenance service keeps your app up to date with operating system changes, feature updates, and bug fixes. We ensure long-term app health and user satisfaction.",
                "highlights": ["Version and OS compatibility updates", "Bug fix and patch cycles", "Feature enhancement roadmap support"],
            },
        ],
    },
    {
        "id": "additional-it-services",
        "name": "Additional IT & Creative Services",
        "quick_label": "Additional IT",
        "image": "/static/images/services/additional-it.jpg",
        "services": [
            {
                "slug": "graphic-design",
                "title": "Graphic Design",
                "image": "/static/images/services/subsections/graphic-design.jpg",
                "short_description": "Creative design assets for digital, print, and campaigns.",
                "description": "We provide graphic design support for brand assets, promotional materials, and marketing campaigns. Deliverables are aligned to business goals and brand standards.",
                "highlights": ["Campaign and brand collateral", "Digital and print-ready outputs", "Consistent visual quality"],
            },
            {
                "slug": "logo-animation",
                "title": "Logo Animation",
                "image": "/static/images/services/subsections/logo-animation.jpg",
                "short_description": "Animated logo intros for stronger brand recall.",
                "description": "We animate logo identities for use in videos, social media, and presentations. Motion style is tailored to brand personality and communication tone.",
                "highlights": ["Custom motion concepting", "Export for multiple channels", "Brand-consistent animation style"],
            },
            {
                "slug": "motion-graphics",
                "title": "Motion Graphics",
                "image": "/static/images/services/subsections/motion-graphics.jpg",
                "short_description": "Engaging motion content for campaigns and explainers.",
                "description": "Our motion graphics service turns ideas into visual stories that are easy to understand and share. This is ideal for product explainers, social campaigns, and brand storytelling.",
                "highlights": ["Explainer and campaign visuals", "Storyboard to final animation", "Platform-ready motion assets"],
            },
            {
                "slug": "domain-hosting-support",
                "title": "Domain & Hosting Support",
                "image": "/static/images/services/subsections/domain-hosting-support.jpg",
                "short_description": "Technical support for domains, hosting, and setup.",
                "description": "We help configure, migrate, and manage your domain and hosting environment to keep your website accessible and stable. Support covers routine tasks and urgent issues.",
                "highlights": ["Domain and DNS management", "Hosting setup and migrations", "Reliability and uptime support"],
            },
            {
                "slug": "website-security",
                "title": "Website Security",
                "image": "/static/images/services/subsections/website-security.jpg",
                "short_description": "Security hardening and protection for business websites.",
                "description": "We strengthen website security through configuration hardening, monitoring, and preventive best practices. The goal is to reduce risk and protect business continuity.",
                "highlights": ["Security configuration review", "Threat monitoring and response support", "Ongoing hardening recommendations"],
            },
            {
                "slug": "api-integration",
                "title": "API Integration",
                "image": "/static/images/services/subsections/api-integration.jpg",
                "short_description": "Reliable API integrations for connected digital workflows.",
                "description": "We integrate third-party services and internal systems to automate workflows and improve data flow. Integrations are built for stability, security, and maintainability.",
                "highlights": ["Third-party platform integration", "Data sync and automation", "Secure integration architecture"],
            },
            {
                "slug": "cloud-solutions",
                "title": "Cloud Solutions",
                "image": "/static/images/services/subsections/cloud-solutions.jpg",
                "short_description": "Cloud architecture and deployment support for scale.",
                "description": "Our cloud services help businesses deploy, optimize, and maintain applications in modern cloud environments. We focus on performance, resilience, and cost-awareness.",
                "highlights": ["Cloud deployment planning", "Infrastructure optimization", "Scalable and resilient setup"],
            },
        ],
    },
]


def get_service_sections():
    return SERVICE_SECTIONS


def get_service_map():
    service_map = {}
    for section in SERVICE_SECTIONS:
        for service in section["services"]:
            subsection_image = service.get(
                "image",
                f"/static/images/services/subsections/{service['slug']}.jpg"
            )
            svg_fallback = f"/static/images/services/subsections/{service['slug']}.svg"

            # Prefer the configured image; if missing, try subsection SVG before section fallback.
            image_to_use = subsection_image
            if subsection_image.startswith("/static/"):
                jpg_path = Path(settings.BASE_DIR, *subsection_image.lstrip("/").split("/"))
                if not jpg_path.exists():
                    svg_path = Path(settings.BASE_DIR, *svg_fallback.lstrip("/").split("/"))
                    image_to_use = svg_fallback if svg_path.exists() else section["image"]

            service_map[service["slug"]] = {
                **service,
                "section_id": section["id"],
                "section_name": section["name"],
                "fallback_image": section["image"],
                "image": image_to_use or section["image"],
            }
    return service_map
