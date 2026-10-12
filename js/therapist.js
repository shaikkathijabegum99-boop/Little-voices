
document.addEventListener("DOMContentLoaded", function () {
    const page = document.querySelector("main");


    if (!page || !page.querySelector(".therapists-hero")) return;

    page.classList.add("therapists-js-enabled");

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    const revealSelectors = [
        ".therapists-hero-content",
        ".therapists-hero-image",
        ".therapists-intro-image",
        ".therapists-intro-content",
        ".therapists-section-heading",
        ".therapist-card",
        ".expertise-card",
        ".therapists-approach-content",
        ".therapists-approach-image",
        ".approach-step",
        ".therapists-family-image",
        ".therapists-family-content",
        ".therapists-cta-inner"
    ];

    const revealElements = page.querySelectorAll(
        revealSelectors.join(",")
    );


    if (reduceMotion || !("IntersectionObserver" in window)) {
        revealElements.forEach(function (element) {
            element.classList.add("therapists-visible");
        });
    } else {
        const revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("therapists-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach(function (element, index) {
            element.classList.add("therapists-reveal");
            element.style.setProperty(
                "--therapists-delay",
                (index % 4) * 100 + "ms"
            );

            revealObserver.observe(element);
        });
    }


    const cards = page.querySelectorAll(
        ".therapist-card, .expertise-card"
    );

    cards.forEach(function (card) {
        card.addEventListener("mouseenter", function () {
            card.classList.add("therapists-card-active");
        });

        card.addEventListener("mouseleave", function () {
            card.classList.remove("therapists-card-active");
        });

        card.addEventListener("focusin", function () {
            card.classList.add("therapists-card-active");
        });

        card.addEventListener("focusout", function (event) {
            if (!card.contains(event.relatedTarget)) {
                card.classList.remove("therapists-card-active");
            }
        });
    });


    const images = page.querySelectorAll("img");

    images.forEach(function (img) {
        const imageContainer = img.parentElement;

        function imageLoaded() {
            img.classList.add("therapists-image-loaded");
            img.classList.remove("therapists-image-error");

            if (imageContainer) {
                imageContainer.classList.remove("image-placeholder");
            }
        }

        function imageFailed() {
            img.classList.add("therapists-image-error");

            if (imageContainer) {
                imageContainer.classList.add("image-placeholder");
            }
        }

        if (img.complete) {
            if (img.naturalWidth > 0) {
                imageLoaded();
            } else {
                imageFailed();
            }
        } else {
            img.addEventListener("load", imageLoaded, {
                once: true
            });

            img.addEventListener("error", imageFailed, {
                once: true
            });
        }
    });


    page.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            let target;

            try {
                target = page.querySelector(targetId);
            } catch (error) {
                return;
            }

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: reduceMotion ? "auto" : "smooth",
                block: "start"
            });
        });
    });


    const buttons = page.querySelectorAll(
        ".therapists-btn, .therapist-card-link"
    );

    buttons.forEach(function (button) {
        button.addEventListener("mouseenter", function () {
            button.classList.add("therapists-button-active");
        });

        button.addEventListener("mouseleave", function () {
            button.classList.remove("therapists-button-active");
        });
    });
});
