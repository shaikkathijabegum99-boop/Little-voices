document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const html = document.documentElement;

    const mobileToggle = document.getElementById("mobile-toggle");
    const navLinks = document.querySelector(".nav-links");
    const header = document.getElementById("main-header");


    const themeToggles = document.querySelectorAll(
        ".theme-toggle, #theme-toggle"
    );

    function applyTheme(theme) {
        const isLight = theme === "light";

        body.classList.toggle("light-mode", isLight);
        body.classList.toggle("dark-mode", !isLight);

        html.classList.toggle("light-mode", isLight);
        html.classList.toggle("dark-mode", !isLight);

        html.setAttribute("data-theme", theme);

        themeToggles.forEach(function (button) {
            const icon = isLight
                ? "fa-regular fa-moon"
                : "fa-regular fa-sun";

            button.innerHTML = button.classList.contains("mobile-cta-btn")
                ? `<i class="${icon}"></i><span>${isLight ? "Dark Mode" : "Light Mode"}</span>`
                : `<i class="${icon}"></i>`;

            button.setAttribute(
                "aria-label",
                isLight ? "Switch to dark mode" : "Switch to light mode"
            );
            button.setAttribute("type", "button");
        });

        try {
            localStorage.setItem("littleVoicesTheme", theme);
        } catch (error) {

        }
    }

    let savedTheme = "dark";

    try {
        savedTheme = localStorage.getItem("littleVoicesTheme") || "dark";
    } catch (error) {}

    applyTheme(savedTheme);

    themeToggles.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const isCurrentlyLight =
                body.classList.contains("light-mode");

            applyTheme(isCurrentlyLight ? "dark" : "light");
        });
    });


    const rtlToggles = document.querySelectorAll(
        ".rtl-toggle, #rtl-toggle"
    );

    function applyDirection(direction) {
        html.setAttribute("dir", direction);

        rtlToggles.forEach(function (button) {
            button.textContent = direction === "rtl" ? "LTR" : "RTL";
            button.setAttribute(
                "aria-label",
                direction === "rtl"
                    ? "Switch to left-to-right layout"
                    : "Switch to right-to-left layout"
            );
        });

        try {
            localStorage.setItem("littleVoicesDirection", direction);
        } catch (error) {}
    }

    let savedDirection = "ltr";

    try {
        savedDirection =
            localStorage.getItem("littleVoicesDirection") || "ltr";
    } catch (error) {}

    applyDirection(savedDirection);

    rtlToggles.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const currentDirection = html.getAttribute("dir") || "ltr";

            applyDirection(currentDirection === "ltr" ? "rtl" : "ltr");
        });
    });


    function closeMobileMenu() {
        if (navLinks) {
            navLinks.classList.remove("active");
        }

        if (mobileToggle) {
            mobileToggle.classList.remove("active");
            mobileToggle.setAttribute("aria-expanded", "false");
            mobileToggle.setAttribute("aria-label", "Open navigation menu");
        }

        body.classList.remove("overflow-hidden");
    }

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("active");

            mobileToggle.classList.toggle("active", isOpen);
            mobileToggle.setAttribute("aria-expanded", String(isOpen));
            mobileToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            body.classList.toggle("overflow-hidden", isOpen);
        });
    }


    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(function (dropdown) {
        const trigger = dropdown.querySelector(":scope > a");

        if (!trigger) return;

        trigger.addEventListener("click", function (event) {
            if (window.innerWidth <= 1024) {
                event.preventDefault();

                dropdown.classList.toggle("active");
            }
        });
    });


    document.querySelectorAll(".nav-links a").forEach(function (link) {
        link.addEventListener("click", function () {
            const dropdown = link.closest(".dropdown");
            const isDropdownTrigger =
                dropdown && link === dropdown.querySelector(":scope > a");

            if (window.innerWidth <= 1024 && isDropdownTrigger) {
                return;
            }

            closeMobileMenu();
        });
    });


    function handleScroll() {
        if (!header) return;

        header.classList.toggle("scrolled", window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();


    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const activeClasses = {
        "index.html": ".nav-item-home",
        "home2.html": ".nav-item-home",
        "about.html": ".nav-item-about",
        "services.html": ".nav-item-services",
        "therapists.html": ".nav-item-therapists",
        "pricing.html": ".nav-item-Pricing",
        "contact.html": ".nav-item-contact"
    };

    const activeSelector = activeClasses[currentPage];

    if (activeSelector) {
        document.querySelectorAll(activeSelector).forEach(function (link) {
            link.classList.add("active");
        });
    }


    window.addEventListener("resize", function () {
        if (window.innerWidth > 1024) {
            closeMobileMenu();

            dropdowns.forEach(function (dropdown) {
                dropdown.classList.remove("active");
            });
        }
    });


    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
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
});