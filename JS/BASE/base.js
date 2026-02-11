/* =========================
   GLOBAL REFERENCES
========================= */
document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const mobileQuery = window.matchMedia("(max-width: 768px)");

  const setDesktopCollapsed = (collapsed) => {
    if (!sidebar) return;
    sidebar.classList.toggle("collapsed", collapsed);
    body.classList.toggle("sidebar-collapsed", collapsed);
    localStorage.setItem("sidebarCollapsed", String(collapsed));
  };

  const closeMobileMenu = () => {
    body.classList.remove("sidebar-open");
  };

  /* =========================
     SIDEBAR CONTROLLER
  ========================= */
  window.toggleSidebar = function () {
    if (!sidebar) return;

    if (mobileQuery.matches) {
      body.classList.toggle("sidebar-open");
      return;
    }

    const isCollapsed = sidebar.classList.contains("collapsed");
    setDesktopCollapsed(!isCollapsed);
  };

  // Restore sidebar state on page load (desktop only)
  if (sidebar && !mobileQuery.matches) {
    const shouldCollapse = localStorage.getItem("sidebarCollapsed") === "true";
    setDesktopCollapsed(shouldCollapse);
  }

  // Close mobile menu when overlay or nav link is clicked
  if (overlay) {
    overlay.addEventListener("click", closeMobileMenu);
  }

  if (sidebar) {
    sidebar.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (mobileQuery.matches) {
          closeMobileMenu();
        }
      });
    });
  }

  // Handle breakpoint changes cleanly
  mobileQuery.addEventListener("change", (event) => {
    closeMobileMenu();
    if (!event.matches) {
      const shouldCollapse = localStorage.getItem("sidebarCollapsed") === "true";
      setDesktopCollapsed(shouldCollapse);
    }
  });

  /* =========================
     SCROLL PROGRESS
  ========================= */
  const progress = document.createElement("div");
  progress.id = "scroll-progress";
  document.body.appendChild(progress);

  window.addEventListener("scroll", () => {
    const h = document.documentElement;
    const scrolled =
      (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progress.style.width = scrolled + "%";
  });

  /* =========================
     SECTION REVEAL
  ========================= */
  const sections = document.querySelectorAll(".section");

  if (sections.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach(sec => observer.observe(sec));
  }

  /* =========================
     CARD 3D TILT (DESKTOP ONLY)
  ========================= */
  const isTouchDevice = window.matchMedia(
    "(hover: none) and (pointer: coarse)"
  ).matches;

  if (!isTouchDevice) {
    document.querySelectorAll(".card, .service-card").forEach(card => {
      card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;

        const rx = ((y - r.height / 2) / 30).toFixed(2);
        const ry = (-(x - r.width / 2) / 30).toFixed(2);

        card.style.transform =
          `translateY(-10px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
      });
    });
  }

  /* =========================
     SMOOTH SCROLL
  ========================= */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* =========================
     FOOTER CLOCK + SESSION TIMER
  ========================= */
  const clockEl = document.querySelector("[data-clock]");
  const tzEl = document.querySelector("[data-timezone]");
  const sessionEl = document.querySelector("[data-session]");
  const sessionStart = performance.now();

  const updateClock = () => {
    if (!clockEl && !tzEl && !sessionEl) return;

    if (clockEl) {
      const now = new Date();
      clockEl.textContent = new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }).format(now);
    }

    if (tzEl) {
      tzEl.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone || "Local";
    }

    if (sessionEl) {
      const elapsed = Math.floor((performance.now() - sessionStart) / 1000);
      const hours = String(Math.floor(elapsed / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
      const seconds = String(elapsed % 60).padStart(2, "0");
      sessionEl.textContent = `${hours}:${minutes}:${seconds}`;
    }
  };

  updateClock();
  setInterval(updateClock, 1000);

  /* =========================
     ABOUT PAGE MICRO-INTERACTIONS
  ========================= */
  const aboutCards = document.querySelectorAll(
    ".section .card, .section .service-card"
  );

  aboutCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.boxShadow = "0 20px 50px rgba(127,90,240,0.35)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "";
    });
  });

  /* =========================
     TEXT FADE-IN STAGGER (ABOUT PAGE)
  ========================= */
  const aboutSections = document.querySelectorAll(".section");

  aboutSections.forEach(section => {
    const items = section.querySelectorAll("p, h3");

    items.forEach((el, i) => {
      el.style.transitionDelay = `${i * 80}ms`;
    });
  });

});
