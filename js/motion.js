(function () {
  document.querySelectorAll("[data-count]").forEach(function (el) {
    var end = parseInt(el.getAttribute("data-count"), 10);
    if (!end) return;
    var started = false;
    function run() {
      if (started) return;
      started = true;
      var start = performance.now();
      function step(now) {
        var p = Math.min(1, (now - start) / 1100);
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
      }, { threshold: 0.3 });
      io.observe(el);
    } else run();
  });
})();
