(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-count]").forEach(function (el) {
    var end = parseInt(el.getAttribute("data-count"), 10);
    if (!end) return;
    var started = false;
    function run() {
      if (started) return;
      started = true;
      var start = performance.now();
      var dur = 1100;
      function step(now) {
        var p = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(end * eased) + (el.getAttribute("data-suffix") || "");
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            run();
            io.disconnect();
          }
        });
      }, { threshold: 0.4 });
      io.observe(el);
    } else run();
  });

  if (reduced) return;
  var reveal = document.querySelectorAll("[data-reveal], .card, .work-card, .price-card, .g-box, .news-list li, .keyword-block, .stat");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveal.forEach(function (el) {
      el.classList.add("will-reveal");
      io.observe(el);
    });
  }
})();
