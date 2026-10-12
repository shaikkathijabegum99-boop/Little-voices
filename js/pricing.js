

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    
    const faqItems = document.querySelectorAll(".pricing-faq-item");

    faqItems.forEach((item) => {
        item.addEventListener("toggle", () => {
            if (!item.open) return;

            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.open = false;
                }
            });
        });
    });

    
    const pricingCards = document.querySelectorAll(
        ".therapy-pricing-card, .pricing-package-card"
    );

    if ("IntersectionObserver" in window) {
        const cardObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        pricingCards.forEach((card) => {
            card.classList.add("pricing-animate");
            cardObserver.observe(card);
        });
    }

    
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "start"
                });
            }
        });
    });

    
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        document.querySelectorAll(".pricing-animate").forEach((card) => {
            card.classList.add("is-visible");
        });
    }
});
