/*
  Speaker carousel — swipe (touch/trackpad) works natively via
  CSS scroll-snap on .carousel-track. This script adds:
  - dot indicators + prev/next arrows, synced to the visible card
  - auto-scroll every 4.5s, looping back to the first speaker
  - auto-scroll pauses on hover/touch and after manual interaction,
    then resumes a few seconds later
*/
(function () {
  const track = document.getElementById("carousel-track");
  const dotsWrap = document.getElementById("carousel-dots");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  if (!track || !dotsWrap) return;

  const cards = Array.from(track.children);
  const AUTO_DELAY = 4500;
  const RESUME_DELAY = 7000;

  cards.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "Go to speaker " + (i + 1));
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      scrollToIndex(i);
      pauseThenResume();
    });
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function scrollToIndex(i) {
    const card = cards[i];
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }

  function currentIndex() {
    const trackLeft = track.scrollLeft;
    let closest = 0;
    let closestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - track.offsetLeft - trackLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    return closest;
  }

  function updateActive() {
    const i = currentIndex();
    dots.forEach((d, di) => d.classList.toggle("active", di === i));
    if (prevBtn) prevBtn.disabled = false;
    if (nextBtn) nextBtn.disabled = false;
  }

  let ticking = false;
  track.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
      ticking = true;
    }
  });

  function goNext() {
    const next = (currentIndex() + 1) % cards.length;
    scrollToIndex(next);
  }
  function goPrev() {
    const prev = (currentIndex() - 1 + cards.length) % cards.length;
    scrollToIndex(prev);
  }

  if (prevBtn) prevBtn.addEventListener("click", () => { goPrev(); pauseThenResume(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { goNext(); pauseThenResume(); });

  // --- auto-scroll ---
  let autoTimer = null;
  let resumeTimer = null;

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(goNext, AUTO_DELAY);
  }
  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = null;
  }
  function pauseThenResume() {
    stopAuto();
    if (resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(startAuto, RESUME_DELAY);
  }

  track.addEventListener("mouseenter", stopAuto);
  track.addEventListener("mouseleave", startAuto);
  track.addEventListener("touchstart", () => stopAuto(), { passive: true });
  track.addEventListener("touchend", pauseThenResume, { passive: true });

  updateActive();
  startAuto();
})();