

document.addEventListener("DOMContentLoaded", function () {

    const home2 = document.querySelector(".home2");

    if (!home2) return;


    /* ==========================================
       1. SCROLL REVEAL ANIMATIONS
    ========================================== */

    const revealElements = home2.querySelectorAll(
        ".home2-specialties, " +
        ".home2-specialty-card, " +
        ".home2-experience, " +
        ".home2-experience-point, " +
        ".home2-first-visit, " +
        ".home2-visit-step, " +
        ".home2-family, " +
        ".home2-family-tip, " +
        ".home2-faq, " +
        ".home2-faq-item, " +
        ".home2-final-cta"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach(function (element) {
            element.classList.add("home2-reveal");
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("is-visible");
        });

    }


    /* ==========================================
       2. STAGGERED SPECIALTY CARD ANIMATIONS
    ========================================== */

    const specialtyCards = home2.querySelectorAll(
        ".home2-specialty-card"
    );

    specialtyCards.forEach(function (card, index) {

        card.style.setProperty(
            "--home2-delay",
            (index * 100) + "ms"
        );

    });


    /* ==========================================
       3. FAQ ACCORDION
       Opens one question at a time
    ========================================== */

    const faqItems = home2.querySelectorAll(
        ".home2-faq-item"
    );

    faqItems.forEach(function (item) {

        const summary = item.querySelector("summary");

        if (!summary) return;

        summary.setAttribute("aria-expanded", item.open ? "true" : "false");

        summary.addEventListener("click", function (event) {

            event.preventDefault();

            const shouldOpen = !item.open;

            faqItems.forEach(function (otherItem) {

                otherItem.open = false;

                const otherSummary = otherItem.querySelector("summary");

                if (otherSummary) {
                    otherSummary.setAttribute("aria-expanded", "false");
                }

            });

            if (shouldOpen) {

                item.open = true;

                summary.setAttribute("aria-expanded", "true");

            }

        });

    });


    /* ==========================================
       4. FAQ ICON UPDATE
    ========================================== */

    function updateFaqIcons() {

        faqItems.forEach(function (item) {

            const icon = item.querySelector("summary i");

            if (!icon) return;

            icon.classList.toggle("fa-plus", !item.open);
            icon.classList.toggle("fa-minus", item.open);

        });

    }

    updateFaqIcons();

    faqItems.forEach(function (item) {

        item.addEventListener("toggle", updateFaqIcons);

    });


    /* ==========================================
       5. HERO IMAGE LOAD EFFECT
    ========================================== */

    const heroImage = home2.querySelector(
        ".home2-hero-image img"
    );

    if (heroImage) {

        function markHeroImageLoaded() {
            heroImage.classList.add("image-loaded");
        }

        if (heroImage.complete && heroImage.naturalWidth > 0) {

            markHeroImageLoaded();

        } else {

            heroImage.addEventListener(
                "load",
                markHeroImageLoaded,
                { once: true }
            );

        }

    }


    /* ==========================================
       6. SECTION IMAGE ERROR HANDLING
       Avoid broken-image icons
    ========================================== */

    const sectionImages = home2.querySelectorAll("img");

    sectionImages.forEach(function (img) {

        img.addEventListener("error", function () {

            img.classList.add("image-load-error");

            img.setAttribute("data-image-error", "true");

        });

        if (img.complete && img.naturalWidth === 0 && img.currentSrc) {

            img.classList.add("image-load-error");

            img.setAttribute("data-image-error", "true");

        }

    });


    /* ==========================================
       7. CTA BUTTON CLICK FEEDBACK
       Only applies to Home 2 links
    ========================================== */

    const ctaLinks = home2.querySelectorAll(
        ".home2-btn, " +
        ".home2-text-link, " +
        ".home2-hero-secondary-link"
    );

    ctaLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (
                link.getAttribute("href") === "#" ||
                !link.getAttribute("href")
            ) {
                return;
            }

            link.classList.add("home2-link-clicked");

        });

    });


    /* ==========================================
       8. REDUCED MOTION ACCESSIBILITY
    ========================================== */

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    function applyMotionPreference() {

        if (prefersReducedMotion.matches) {

            home2.classList.add("home2-reduced-motion");

            revealElements.forEach(function (element) {
                element.classList.add("is-visible");
            });

        } else {

            home2.classList.remove("home2-reduced-motion");

        }

    }

    applyMotionPreference();

    if (prefersReducedMotion.addEventListener) {

        prefersReducedMotion.addEventListener(
            "change",
            applyMotionPreference
        );

    }


    /* ==========================================
       9. HERO CONTENT ENTRANCE
    ========================================== */

    const heroContent = home2.querySelector(
        ".home2-hero-content-inner"
    );

    const heroVisual = home2.querySelector(
        ".home2-hero-visual"
    );

    requestAnimationFrame(function () {

        if (heroContent) {
            heroContent.classList.add("home2-hero-ready");
        }

        if (heroVisual) {
            heroVisual.classList.add("home2-hero-ready");
        }

    });


    /* ==========================================
       10. CURRENT SECTION INITIALIZATION
    ========================================== */

    home2.classList.add("home2-js-ready");

});
