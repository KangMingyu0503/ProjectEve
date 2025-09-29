document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navList = document.getElementById("NavBarList");
  const navbar = document.querySelector(".NavBar");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".NavBarList a");

  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener("click", () => navList.classList.toggle("show"));
  }

  // Update which section is most visible on screen:
  function updateActiveSection() {
    let maxRatio = 0;
    let activeId = sections[0]?.id || null;

    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      const height = rect.height || (window.innerHeight || 1);
      const visible = Math.max(0, Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top));
      const ratio = visible / height;

      // mark section in-view for fade-up when > 15% visible
      sec.classList.toggle("in-view", ratio > 0.15);

      if (ratio > maxRatio) {
        maxRatio = ratio;
        activeId = sec.id;
      }
    });

    // set navbar theme class based on the most visible section
    if (activeId === "music") {
      navbar.classList.add("theme-music");
      navbar.classList.remove("theme-f1");
    } else {
      navbar.classList.add("theme-f1");
      navbar.classList.remove("theme-music");
    }

    // highlight the active nav link (optional)
    navLinks.forEach(a => {
      const href = a.getAttribute("href");
      a.classList.toggle("active", href === `#${activeId}`);
    });
  }

  // run on load and on scroll/resize
  updateActiveSection();
  window.addEventListener("scroll", updateActiveSection, { passive: true });
  window.addEventListener("resize", updateActiveSection);

  // Optional: close mobile menu when clicking a nav link
  navLinks.forEach(a => {
    a.addEventListener("click", () => {
      if (navList.classList.contains("show")) navList.classList.remove("show");
    });
  });
});
