
(function () {
  const KEY = "oro-youth-summit-2026-sept12-visits-legates";
  const el = document.getElementById("visit-count");
  if (!el) return;

  fetch(`https://countapi.mileshilliard.com/api/v1/hit/${KEY}`)
    .then((res) => res.json())
    .then((data) => {
      el.textContent = Number(data.value).toLocaleString();
    })
    .catch(() => {
      el.textContent = "—";
    });
})();
