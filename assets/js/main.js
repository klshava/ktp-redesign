document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const menuBtn = document.querySelector("[data-menu-open]");
  const closeBtn = document.querySelector("[data-menu-close]");
  const scrim = document.querySelector(".nav-scrim");

  const openNav = () => document.body.classList.add("nav-open");
  const closeNav = () => document.body.classList.remove("nav-open");

  menuBtn?.addEventListener("click", openNav);
  closeBtn?.addEventListener("click", closeNav);
  scrim?.addEventListener("click", closeNav);
  document.querySelectorAll(".primary-nav a").forEach((a) => a.addEventListener("click", closeNav));

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  // Lightbox for gallery
  const lightbox = document.querySelector("[data-lightbox]");
  if (lightbox) {
    const lightboxImg = lightbox.querySelector("img");
    document.querySelectorAll("[data-lightbox-trigger]").forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        lightboxImg.src = trigger.getAttribute("href") || trigger.querySelector("img").src;
        lightbox.classList.add("open");
      });
    });
    lightbox.querySelector("[data-lightbox-close]").addEventListener("click", () => {
      lightbox.classList.remove("open");
    });
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.classList.remove("open");
    });
  }

  root.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
});
