

document.addEventListener("DOMContentLoaded", function () {


    const revealElements = document.querySelectorAll(
        ".contact-hero-content, " +
        ".contact-details-intro, " +
        ".contact-section-heading, " +
        ".contact-info-card, " +
        ".contact-form-content, " +
        ".contact-form-card, " +
        ".contact-location-content, " +
        ".contact-map-placeholder, " +
        ".contact-faq-item, " +
        ".footer-cta-content, " +
        ".footer-brand, " +
        ".footer-nav, " +
        ".footer-services, " +
        ".footer-contact"
    );

    revealElements.forEach(function (element, index) {
        element.style.opacity = "0";
        element.style.transform = "translateY(25px)";
        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

        element.style.transitionDelay =
            (index % 4) * 0.08 + "s";

        element.classList.add("contact-reveal");
    });

    /* ==========================================
       2. REVEAL ELEMENTS WHEN VISIBLE
       ========================================== */

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";

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
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        });

    }


    document.querySelectorAll(
        '.contact-hero a[href^="#"], ' +
        '.footer-cta-btn[href^="#"]'
    ).forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("contactFormStatus");

    if (contactForm && formStatus) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            formStatus.textContent =
                "Your form is ready, but it has not been sent. Connect a secure form service or backend to receive enquiries.";

            formStatus.style.display = "block";
            formStatus.style.color = "#B45309";
            formStatus.style.marginTop = "14px";
            formStatus.style.lineHeight = "1.6";

        });

    }


    const faqItems = document.querySelectorAll(
        ".contact-faq-item"
    );

    faqItems.forEach(function (item) {

        item.addEventListener("toggle", function () {

            if (item.open) {

                faqItems.forEach(function (otherItem) {

                    if (otherItem !== item) {
                        otherItem.open = false;
                    }

                });

            }

        });

    });


    document.querySelectorAll(
        ".contact-info-card"
    ).forEach(function (card) {

        card.addEventListener("mouseenter", function () {
            card.style.transform = "translateY(-5px)";
        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "translateY(0)";
        });

    });


    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    function handleReducedMotion() {

        if (prefersReducedMotion.matches) {

            revealElements.forEach(function (element) {
                element.style.transition = "none";
                element.style.opacity = "1";
                element.style.transform = "none";
            });

        }

    }

    handleReducedMotion();

    if (prefersReducedMotion.addEventListener) {
        prefersReducedMotion.addEventListener(
            "change",
            handleReducedMotion
        );
    }

});
