
(function () {
  const EVENT_DATE = { year: 2026, month: 8, day: 9 }; // month is 0-indexed: 8 = September

  const dayStart = new Date(EVENT_DATE.year, EVENT_DATE.month, EVENT_DATE.day, 0, 0, 0);
  const dayEnd = new Date(EVENT_DATE.year, EVENT_DATE.month, EVENT_DATE.day + 1, 0, 0, 0);
  const now = new Date();

  const isEventDay = now >= dayStart && now < dayEnd;
  if (!isEventDay) return;

  const hero = document.querySelector(".hero");
  const marquee = document.querySelector(".marquee");
  const stream = document.querySelector(".stream-section");
  if (!hero || !stream) return;

  // Move the marquee + livestream section above the hero, keeping
  // the marquee directly above the video (not just above the hero).
  if (marquee) hero.parentNode.insertBefore(marquee, hero);
  hero.parentNode.insertBefore(stream, hero);

  // Let CSS know it's event day (pulsing "live" cue on the watch button,
  // and a small note swap).
  document.body.classList.add("is-live");

  const sub = stream.querySelector(".sub");
  if (sub) sub.textContent = "We're live now — Kindly follows us on all social media platforms.";
})();
 
