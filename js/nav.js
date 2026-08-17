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

  function asset(name) {
    var path = (location.pathname || "").replace(/\\/g, "/");
    return /\/(legal|admin)(\/|$)/.test(path) ? "../" + name : name;
  }
  document.querySelectorAll("a.logo").forEach(function (el) {
    var img = el.querySelector("img");
    if (!img) {
      img = document.createElement("img");
      el.insertBefore(img, el.firstChild);
    }
    img.src = asset("logo-mark.png");
    img.alt = "Mirage Spoofer";
    img.width = 36;
    img.height = 36;
    img.style.width = "36px";
    img.style.height = "36px";
    img.style.objectFit = "contain";
  });
  var footer = document.querySelector(".site-footer");
  if (footer && !footer.querySelector(".footer-brand")) {
    var brand = document.createElement("p");
    brand.className = "footer-brand";
    brand.innerHTML = '<img src="' + asset("logo-mark.png") + '" width="28" height="28" alt=""> <strong>Mirage Spoofer</strong>';
    footer.insertBefore(brand, footer.firstChild);
  }
})();
