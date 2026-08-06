// =========================================================
// Ajayi Oluwafemi Olaiya — Portfolio interactions
// =========================================================

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -----------------------------------------------------
     1. Hovering 3D signal field — subtle cursor parallax
  ----------------------------------------------------- */
  var bg = document.querySelector(".bg-3d");

  if (bg && !reduceMotion) {
    var targetX = 0, targetY = 0, curX = 0, curY = 0;

    window.addEventListener("mousemove", function (e) {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function tick() {
      curX += (targetX - curX) * 0.04;
      curY += (targetY - curY) * 0.04;
      bg.style.transform =
        "rotateY(" + (curX * 4) + "deg) rotateX(" + (-curY * 4) + "deg) scale(1.02)";
      requestAnimationFrame(tick);
    }
    tick();
  }

  /* -----------------------------------------------------
     2. Scroll reveal for sections + experience card
  ----------------------------------------------------- */
  var revealTargets = document.querySelectorAll("section, .experience-card");

  if ("IntersectionObserver" in window && revealTargets.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* -----------------------------------------------------
     3. Active nav link tracking
  ----------------------------------------------------- */
  var navLinks = document.querySelectorAll("nav[aria-label='Main navigation'] a");
  var sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = document.querySelector('nav[aria-label="Main navigation"] a[href="#' + entry.target.id + '"]');
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove("active"); });
            link.classList.add("active");
          }
        });
      },
      { threshold: 0.4, rootMargin: "-64px 0px -40% 0px" }
    );
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* -----------------------------------------------------
     4. Smooth-scroll fallback for older browsers
  ----------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });
})();
