(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var glow = document.querySelector(".cursor-glow");
  if (glow && window.matchMedia("(pointer: fine)").matches) {
    glow.hidden = false;
    window.addEventListener("pointermove", function (event) {
      glow.style.transform = "translate(" + (event.clientX - 160) + "px, " + (event.clientY - 160) + "px)";
    }, { passive: true });
  }

  if (!reduced) {
    var reveal = document.querySelectorAll("[data-reveal], .card, .work-card, .price-card, .g-box, .news-list li, .keyword-block");
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
  }

  var tiltTargets = document.querySelectorAll("[data-tilt], .hero-stage, .card, .price-card");
  if (!reduced && window.matchMedia("(pointer: fine)").matches) {
    tiltTargets.forEach(function (el) {
      el.addEventListener("pointermove", function (event) {
        var box = el.getBoundingClientRect();
        var x = (event.clientX - box.left) / box.width - 0.5;
        var y = (event.clientY - box.top) / box.height - 0.5;
        el.style.transform = "rotateY(" + (x * 14) + "deg) rotateX(" + (-y * 10) + "deg) translateZ(8px)";
      });
      el.addEventListener("pointerleave", function () {
        el.style.transform = "";
      });
    });
  }
})();
