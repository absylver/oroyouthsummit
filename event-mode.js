/*
  Event-day mode.
  Most visits happen before Sept 12 — the hero (who/what/when)
  should lead, since that's what gets people to show up or share
  the link. But on the day itself, visitors already know all that
  and just want the stream — so this swaps the livestream section
  to the very top of the page, automatically, based on the visitor's
  own device clock. No manual editing needed on the day.

  To test this locally, temporarily change EVENT_DATE below to
  today's date and refresh.
*/
(function () {
  const EVENT_DATE = { year: 2026, month: 8, day: 12 }; // month is 0-indexed: 8 = September

  const dayStart = new Date(EVENT_DATE.year, EVENT_DATE.month, EVENT_DATE.day, 0, 0, 0);
  const dayEnd = new Date(EVENT_DATE.year, EVENT_DATE.month, EVENT_DATE.day + 1, 0, 0, 0);
  const now = new Date();

  const isEventDay = now >= dayStart && now < dayEnd;
  if (!isEventDay) return;

  const hero = document.querySelector(".hero");
  const stream = document.querySelector(".stream-section");
  if (!hero || !stream) return;

  // Move the livestream section above the hero.
  hero.parentNode.insertBefore(stream, hero);

  // Let CSS know it's event day (pulsing "live" cue on the watch button,
  // and a small note swap).
  document.body.classList.add("is-live");

  const sub = stream.querySelector(".sub");
  if (sub) sub.textContent = "We're live now — the stream is playing below.";
})();
