/* Google Analytics 4 — same Firebase property as the Android app (mirage-spoofer).
   gtag/js (googletagmanager.com) often fails behind adblock; then we ping g/collect directly. */
window.MIRAGE_GA_ID = "G-4S3HZTDL3K";

(function () {
  var id = window.MIRAGE_GA_ID;
  if (!id || id.indexOf("G-") !== 0) return;

  var backupSent = false;
  var gtagLoaded = false;

  function clientId() {
    var key = "mirage_ga_cid";
    try {
      var existing = localStorage.getItem(key);
      if (existing) return existing;
      var created = (crypto.randomUUID && crypto.randomUUID()) ||
        (Date.now() + "-" + Math.random().toString(16).slice(2));
      localStorage.setItem(key, created);
      return created;
    } catch (e) {
      return Date.now() + "-" + Math.random().toString(16).slice(2);
    }
  }

  function sessionId() {
    var key = "mirage_ga_sid";
    var now = Math.floor(Date.now() / 1000);
    try {
      var raw = sessionStorage.getItem(key);
      if (raw) return raw;
      sessionStorage.setItem(key, String(now));
      return String(now);
    } catch (e) {
      return String(now);
    }
  }

  function sendBackupPageView() {
    if (backupSent || gtagLoaded) return;
    backupSent = true;
    var params = new URLSearchParams();
    params.set("v", "2");
    params.set("tid", id);
    params.set("cid", clientId());
    params.set("en", "page_view");
    params.set("dl", location.href);
    params.set("dt", document.title || "");
    params.set("sid", sessionId());
    params.set("sct", "1");
    params.set("seg", "1");
    params.set("_s", "1");
    var url = "https://www.google-analytics.com/g/collect?" + params.toString();
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url);
        return;
      }
    } catch (e) {}
    var img = new Image();
    img.src = url;
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  var script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
  script.onload = function () { gtagLoaded = true; };
  script.onerror = sendBackupPageView;
  document.head.appendChild(script);
  gtag("js", new Date());
  gtag("config", id, { anonymize_ip: true });
  setTimeout(sendBackupPageView, 2000);
})();
