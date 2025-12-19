/* =========================
   GLOBAL REFERENCES
========================= */
document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;
  const sidebar = document.getElementById("sidebar");

  /* =========================
     SIDEBAR CONTROLLER
  ========================= */
  window.toggleSidebar = function () {
    if (!sidebar) return;

    sidebar.classList.toggle("collapsed");
    body.classList.toggle("sidebar-collapsed");

    // Persist state across pages
    const isCollapsed = sidebar.classList.contains("collapsed");
    localStorage.setItem("sidebarCollapsed", isCollapsed);
  };

  // Restore sidebar state on page load
  if (sidebar && localStorage.getItem("sidebarCollapsed") === "true") {
    sidebar.classList.add("collapsed");
    body.classList.add("sidebar-collapsed");
  }

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

});
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
