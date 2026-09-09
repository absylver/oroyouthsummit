/*
  Scroll-reveal animations. Any element with class "reveal-left",
  "reveal-right", or "reveal-up" starts hidden/offset and animates
  into place the first time it scrolls into view (hero elements,
  being already in view on load, animate in right away).

  Respects prefers-reduced-motion: if the visitor has that setting
  on, elements just appear normally with no motion (handled in CSS).
*/
(function () {
  const targets = document.querySelectorAll(".reveal-left, .reveal-right, .reveal-up");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    // Fallback: just show everything.
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
})();
