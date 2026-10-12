
document.addEventListener("DOMContentLoaded", function () {
    const servicePage = document.querySelector(".service-page");


    if (!servicePage) return;

    servicePage.classList.add("service-js-enabled");


    const revealElements = servicePage.querySelectorAll(`
        .service-hero-content,
        .service-hero-image,
        .service-section-heading,
        .service-card,
        .service-item,
        .service-feature,
        .service-process-item,
        .service-cta-content
    `);


    if (!("IntersectionObserver" in window)) {
        revealElements.forEach(function (element) {
            element.classList.add("service-visible");
        });
    } else {
        const observer = new IntersectionObserver(
            function (entries, currentObserver) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("service-visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(function (element, index) {
            element.classList.add("service-reveal");
            element.style.setProperty(
                "--service-delay",
                (index % 4) * 100 + "ms"
            );

            observer.observe(element);
        });
    }


    const serviceCards = servicePage.querySelectorAll(
        ".service-card, .service-item, .service-feature"
    );

    serviceCards.forEach(function (card) {
        card.addEventListener("mouseenter", function () {
            card.classList.add("service-card-active");
        });

        card.addEventListener("mouseleave", function () {
            card.classList.remove("service-card-active");
        });

        card.addEventListener("focusin", function () {
            card.classList.add("service-card-active");
        });

        card.addEventListener("focusout", function (event) {
            if (!card.contains(event.relatedTarget)) {
                card.classList.remove("service-card-active");
            }
        });
    });


    const serviceImages = servicePage.querySelectorAll("img");

    serviceImages.forEach(function (img) {
        function markLoaded() {
            img.classList.add("service-image-loaded");
            img.classList.remove("service-image-error");
        }

        function markError() {
            img.classList.add("service-image-error");
            img.classList.remove("service-image-loaded");
        }

        if (img.complete) {
            if (img.naturalWidth > 0) {
                markLoaded();
            } else {
                markError();
            }
        } else {
            img.addEventListener("load", markLoaded, { once: true });
            img.addEventListener("error", markError, { once: true });
        }
    });


    servicePage.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = servicePage.querySelector(targetId);

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


    const ctaButtons = servicePage.querySelectorAll(
        ".service-cta-btn, .service-cta-secondary"
    );

    ctaButtons.forEach(function (button) {
        button.addEventListener("mouseenter", function () {
            button.classList.add("service-cta-active");
        });

        button.addEventListener("mouseleave", function () {
            button.classList.remove("service-cta-active");
        });
    });
});
