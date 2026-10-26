/**
 * SEO Structured Data (JSON-LD) for vexx3m
 * Injects Schema.org metadata (WebSite, VideoGame, ImageObject, FAQPage) into document head
 */
(function () {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://vexx3m.github.io/#website",
        "url": "https://vexx3m.github.io/",
        "name": "vexx3m",
        "description": "Play Vex X3M Online and Vex X3M Unblocked Games for free in your browser."
      },
      {
        "@type": "VideoGame",
        "@id": "https://vexx3m.github.io/",
        "name": "Vex X3M Online",
        "alternateName": ["vexx3m", "Vex X3M Unblocked", "Vex X3M", "Vex Moto X3M"],
        "description": "Vex X3M Online combines the lethal obstacle platforming of Vex with the adrenaline-pumping dirt bike stunt racing of Moto X3M. Perform flips, dodge buzzsaws, and beat the clock across 30+ action-packed tracks.",
        "url": "https://vexx3m.github.io/",
        "image": [
          "https://vexx3m.github.io/images/vex-x3m.png",
          "https://vexx3m.github.io/images/vex-x3m-2.png",
          "https://vexx3m.github.io/images/vex-x3m-3.png"
        ],
        "genre": ["Racing", "Action", "Stunt", "Obstacle Course", "Motorcycle"],
        "gamePlatform": ["Web Browser", "PC", "Mobile", "Chromebook"],
        "applicationCategory": "Game",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "ratingCount": "14820"
        }
      },
      {
        "@type": "ImageObject",
        "@id": "https://vexx3m.github.io/#gameplay-image",
        "url": "https://vexx3m.github.io/images/vex-x3m.png",
        "contentUrl": "https://vexx3m.github.io/images/vex-x3m.png",
        "name": "Vex X3M Online - Stunt Bike Gameplay",
        "description": "Vex X3M dirt bike stunt rider dodging spinning saws and performing backflips on vexx3m.github.io",
        "width": 512,
        "height": 512
      },
      {
        "@type": "FAQPage",
        "@id": "https://vexx3m.github.io/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Vex X3M Online?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Vex X3M Online is a fast-paced HTML5 motorcycle stunt game where players navigate high-speed trial tracks packed with lethal Vex hazards, spinning buzzsaws, spikes, and loop-de-loops."
            }
          },
          {
            "@type": "Question",
            "name": "How can I play Vex X3M unblocked at school or work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can play Vex X3M unblocked directly on vexx3m.github.io. Because the game runs on GitHub Pages using modern HTML5, it bypasses standard network firewalls and requires no downloads or plugins."
            }
          },
          {
            "@type": "Question",
            "name": "Is vexx3m completely free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, vexx3m provides 100% free access to Vex X3M and other popular unblocked games without registration or fees."
            }
          },
          {
            "@type": "Question",
            "name": "What controls are used to play Vex X3M online?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use W / Up Arrow to accelerate, S / Down Arrow to brake/reverse, and A / D or Left / Right Arrows to lean and perform front/back flips. Press R to restart at your last checkpoint."
            }
          }
        ]
      }
    ]
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.text = JSON.stringify(schemaData);
  document.head.appendChild(script);
})();
