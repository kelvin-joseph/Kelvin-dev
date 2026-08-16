window.SITE_CONTENT = {
  "profile": {
    "name": "Kelvin Ene-ojo",
    "role": "React & Frontend Developer · Creative Builder · Product Thinker",
    "shortBio": "I turn ideas into clear, polished digital experiences — from creative websites and thoughtful interfaces to useful products built with React.",
    "about": "I'm a front-end developer who enjoys turning ideas into clear, useful and well-crafted digital experiences. I care about the details people notice and the ones they don't: hierarchy, responsiveness, interaction, performance and the small moments that make a product feel finished. My Biomedical Engineering background is one part of my story, but the work I build is what I want to speak loudest.",
    "photo": "assets/profile.png",
    "availability": "Available for new projects"
  },
  "contact": [
    {
      "label": "Email",
      "value": "kelvinahmodu@gmail.com",
      "href": "mailto:kelvinahmodu@gmail.com",
      "icon": "✉"
    },
    {
      "label": "WhatsApp",
      "value": "+234 906 942 8690",
      "href": "https://wa.me/2349069428690",
      "icon": "◉"
    }
  ],
  "services": [
    {"title":"Responsive Websites","text":"Polished websites that feel intentional across phones, tablets and desktops.","number":"01"},
    {"title":"React Frontend","text":"Interactive interfaces built with reusable components, clean structure and thoughtful states.","number":"02"},
    {"title":"Landing Pages","text":"Focused pages that make a product, service or idea easy to understand and act on.","number":"03"},
    {"title":"Frontend Refinement","text":"Responsive fixes, UI improvements and finishing touches that make an existing site feel complete.","number":"04"}
  ],
  "projects": [
    {
      "slug":"medtrack",
      "title":"MedTrack",
      "category":"Private product / Digital platform",
      "summary":"A biomedical equipment management platform designed around equipment tracking, maintenance workflows and fault reporting.",
      "role":"Product design & frontend development",
      "stack":["React","JavaScript","Supabase","HTML","CSS"],
      "status":"Live demo · Open source",
      "featured":true,
      "cover":"assets/medtrack-landing.png",
      "screenshots":["assets/medtrack-landing.png","assets/medtrack-equipment.png","assets/medtrack-ai.png"],
      "galleryCaptions":[
        {"title":"Product overview","text":"The public-facing experience introduces MedTrack and communicates its core equipment and maintenance workflow."},
        {"title":"Equipment intelligence","text":"A focused view surfaces equipment health, operational status and areas that need attention."},
        {"title":"Biomedical AI Center","text":"The AI experience is framed around equipment-aware troubleshooting and maintenance guidance."}
      ],
      "description":"MedTrack is a biomedical equipment maintenance and predictive-failure platform I've built end to end — equipment tracking, a CMMS-style maintenance scheduler, fault reporting, and a rule-based AI assistant for risk scoring. The version linked below is a public demo: pick any role from the login screen to explore it, no real hospital data involved. It's actively piloted with a real hospital using a separate, private Supabase-backed deployment with proper authentication and row-level security — that instance stays private for obvious reasons, but the source and this demo build are open.",
      "links":[
        {"label":"Live demo","href":"https://medtrack-pied.vercel.app/"},
        {"label":"GitHub","href":"https://github.com/kelvin-joseph/medtrack"}
      ]
    },
    {
      "slug":"nemis-hair",
      "title":"Nemi's Hair",
      "category":"Business website",
      "summary":"A luxury salon booking and e-commerce site for a Lagos-based business, with real-time availability, a product shop, and payments.",
      "role":"Full-stack development",
      "stack":["React","Vite","Node.js","Prisma","Flutterwave"],
      "status":"Case study · Not yet hosted",
      "featured":false,
      "cover":"assets/nemis-hair-hero.png",
      "screenshots":["assets/nemis-hair-hero.png","assets/nemis-hair-services.png","assets/nemis-hair-shop.png","assets/nemis-hair-cta.png"],
      "galleryCaptions":[
        {"title":"Homepage","text":"The landing experience introduces the brand across its Lagos and Abuja locations, with client stats and a direct path to booking."},
        {"title":"Services","text":"A filterable service menu covering cuts, coloring, treatments and styling, each with pricing and duration."},
        {"title":"Shop","text":"A full product catalogue with filtering, ratings and cart — built alongside the booking flow, not bolted on."},
        {"title":"Booking CTA","text":"A closing call-to-action drives visitors toward reserving an appointment."}
      ],
      "description":"Nemi's Hair is a full-stack luxury salon web app — a six-step booking wizard with real-time stylist availability, product shop and checkout, Flutterwave payments and Cloudinary-hosted imagery, built on React/Vite with a Node.js/Express/Prisma backend. It's not currently hosted publicly, so these screenshots are from local development — the source is public in the meantime.",
      "links":[
        {"label":"GitHub","href":"https://github.com/kelvin-joseph/nemis-hair"}
      ]
    }
  ]
};