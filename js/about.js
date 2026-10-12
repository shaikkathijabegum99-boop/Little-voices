

document.addEventListener("DOMContentLoaded", function () {
    const aboutPage = document.querySelector(".about-page");

    if (!aboutPage) return;


    aboutPage.classList.add("about-js-enabled");

    const revealElements = aboutPage.querySelectorAll(
        ".about-hero-content, " +
        ".about-hero-image, " +
        ".about-story-image, " +
        ".about-story-content, " +
        ".about-section-heading, " +
        ".about-timeline-item, " +
        ".about-mission-card, " +
        ".about-vision-card, " +
        ".about-team-card, " +
        ".about-testimonial-card, " +
        ".about-final-cta .about-cta-content"
    );

    revealElements.forEach(function (element, index) {
        element.classList.add("about-reveal");

        if (
            element.classList.contains("about-timeline-item") ||
            element.classList.contains("about-team-card") ||
            element.classList.contains("about-testimonial-card") ||
            element.classList.contains("about-mission-card") ||
            element.classList.contains("about-vision-card")
        ) {
            element.style.setProperty(
                "--about-reveal-delay",
                (index % 4) * 100 + "ms"
            );
        }
    });


    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reduceMotion) {
        const revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("about-visible");
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
            element.classList.add("about-visible");
        });
    }


    const images = aboutPage.querySelectorAll("img");

    images.forEach(function (image) {
        function imageLoaded() {
            image.classList.add("about-image-loaded");
            image.classList.remove("about-image-loading");
        }

        image.classList.add("about-image-loading");

        if (image.complete && image.naturalWidth > 0) {
            imageLoaded();
        } else {
            image.addEventListener("load", imageLoaded, {
                once: true
            });

            image.addEventListener("error", function () {
                image.classList.remove("about-image-loading");
                image.classList.add("about-image-error");
            }, {
                once: true
            });
        }
    });


    const teamCards = aboutPage.querySelectorAll(
        ".about-team-card"
    );

    teamCards.forEach(function (card) {
        card.addEventListener("mouseenter", function () {
            card.classList.add("about-card-hover");
        });

        card.addEventListener("mouseleave", function () {
            card.classList.remove("about-card-hover");
        });

        card.addEventListener("focusin", function () {
            card.classList.add("about-card-hover");
        });

        card.addEventListener("focusout", function (event) {
            if (!card.contains(event.relatedTarget)) {
                card.classList.remove("about-card-hover");
            }
        });
    });


    const testimonialCards = aboutPage.querySelectorAll(
        ".about-testimonial-card"
    );

    testimonialCards.forEach(function (card) {
        card.addEventListener("mouseenter", function () {
            card.classList.add("about-testimonial-active");
        });

        card.addEventListener("mouseleave", function () {
            card.classList.remove("about-testimonial-active");
        });
    });


    const timelineItems = aboutPage.querySelectorAll(
        ".about-timeline-item"
    );

    timelineItems.forEach(function (item, index) {
        item.style.setProperty(
            "--about-timeline-delay",
            index * 120 + "ms"
        );
    });


    const ctaButtons = aboutPage.querySelectorAll(
        ".about-cta-btn, .about-cta-secondary"
    );

    ctaButtons.forEach(function (button) {
        button.addEventListener("mouseenter", function () {
            button.classList.add("about-cta-hover");
        });

        button.addEventListener("mouseleave", function () {
            button.classList.remove("about-cta-hover");
        });
    });


    const testimonialImages = aboutPage.querySelectorAll(
        ".about-testimonial-avatar img"
    );

    testimonialImages.forEach(function (image) {
        image.addEventListener("error", function () {
            const avatar = image.closest(
                ".about-testimonial-avatar"
            );

            if (avatar) {
                avatar.classList.add(
                    "about-avatar-image-error"
                );
            }
        });
    });
});
