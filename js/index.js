

document.addEventListener("DOMContentLoaded", function () {


    const revealSections = document.querySelectorAll(
        ".home1 .section-reveal"
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

        revealSections.forEach(function (section) {
            revealObserver.observe(section);
        });

    } else {

        revealSections.forEach(function (section) {
            section.classList.add("is-visible");
        });

    }



    const cardGroups = [
        ".communication-grid",
        ".milestones-timeline",
        ".support-grid",
        ".everyday-grid"
    ];

    cardGroups.forEach(function (selector) {

        document.querySelectorAll(selector).forEach(function (group) {

            const cards = group.querySelectorAll(
                ".communication-card, " +
                ".milestone-card, " +
                ".support-card, " +
                ".everyday-card"
            );

            cards.forEach(function (card, index) {

                card.style.setProperty(
                    "--card-delay",
                    (index * 100) + "ms"
                );

                card.classList.add("card-reveal");

            });

        });

    });



    const sectionLinks = document.querySelectorAll(
        '.home1 a[href^="#"]'
    );

    sectionLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "start"
            });

        });

    });

    const sectionImages = document.querySelectorAll(
        ".home1 .hero-image img, " +
        ".home1 .communication-icon img, " +
        ".home1 .milestone-icon img, " +
        ".home1 .approach-image img, " +
        ".home1 .everyday-card img, " +
        ".home1 .welcome-image img"
    );

    sectionImages.forEach(function (img) {

        function markImageLoaded() {
            img.classList.add("image-loaded");
        }

        if (img.complete && img.naturalWidth > 0) {

            markImageLoaded();

        } else {

            img.addEventListener("load", markImageLoaded, {
                once: true
            });

        }

    });


    if (window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches) {

        revealSections.forEach(function (section) {
            section.classList.add("is-visible");
        });

        document.querySelectorAll(
            ".home1 .card-reveal"
        ).forEach(function (card) {
            card.classList.add("is-visible");
        });

    }

});
