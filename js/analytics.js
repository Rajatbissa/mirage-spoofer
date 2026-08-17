/* Google Analytics 4 — same Firebase property as the Android app (mirage-spoofer). */
window.MIRAGE_GA_ID = "G-4S3HZTDL3K";

(function () {
  var id = window.MIRAGE_GA_ID;
  if (!id || id.indexOf("G-") !== 0) return;
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  var script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
  document.head.appendChild(script);
  gtag("js", new Date());
  gtag("config", id, { anonymize_ip: true });
})();
