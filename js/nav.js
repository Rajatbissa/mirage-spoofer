(function () {
  var toggle = document.querySelector("[data-nav-toggle]");
  var drawer = document.querySelector("[data-nav-drawer]");
  if (toggle && drawer) {
    toggle.addEventListener("click", function () {
      var open = drawer.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    });
    drawer.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        drawer.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });
  }

  document.querySelectorAll("[data-search-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var input = form.querySelector("input[name='q']");
      var q = input ? input.value.trim() : "";
      var searchPage = form.getAttribute("data-search-action") || "search.html";
      window.location.href = searchPage + (q ? "?q=" + encodeURIComponent(q) : "");
    });
  });
})();
