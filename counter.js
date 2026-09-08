/*
  Visible visitor counter.
  Uses CountAPI (countapi.xyz) — a free, keyless hit-counter service.
  Namespace + key together form a unique counter; change NAMESPACE
  if you want to reset the count, or swap this whole file for a
  Supabase-backed counter later (see note at bottom).
*/
(function () {
  const NAMESPACE = "oro-youth-summit-2026";
  const KEY = "site-visits";
  const el = document.getElementById("visit-count");
  if (!el) return;

  fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`)
    .then((res) => res.json())
    .then((data) => {
      el.textContent = data.value.toLocaleString();
    })
    .catch(() => {
      el.textContent = "—";
    });
})();

/*
  To switch to Supabase later:
  1. Create a table `site_stats (key text primary key, count int)`
     with one row: ('site-visits', 0).
  2. On page load, call an RPC or edge function that does
     `update site_stats set count = count + 1 where key = 'site-visits' returning count`.
  3. Set el.textContent to the returned count.
  This gives you the same visible badge but keeps the number in
  your own Supabase project instead of a third-party service.
*/
