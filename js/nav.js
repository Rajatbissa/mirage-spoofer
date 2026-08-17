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

  if (!document.querySelector(".fx-orbs")) {
    var orbs = document.createElement("div");
    orbs.className = "fx-orbs";
    orbs.setAttribute("aria-hidden", "true");
    orbs.innerHTML = '<span class="orb orb-a"></span><span class="orb orb-b"></span><span class="orb orb-c"></span>';
    document.body.insertBefore(orbs, document.body.firstChild);
  }

  var ico = {
    features: '<svg class="nav-ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    guide: '<svg class="nav-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    download: '<svg class="nav-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>',
    pricing: '<svg class="nav-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    faq: '<svg class="nav-ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4"/><path d="M12 17h.01"/></svg>',
    group: '<svg class="nav-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    admin: '<svg class="nav-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
  };
  function navKey(href) {
    if (!href) return "";
    if (href.indexOf("features") !== -1) return "features";
    if (href.indexOf("guide") !== -1) return "guide";
    if (href.indexOf("download") !== -1) return "download";
    if (href.indexOf("pricing") !== -1) return "pricing";
    if (href.indexOf("faq") !== -1) return "faq";
    if (href.indexOf("miragespoofer_root") !== -1) return "group";
    if (href.indexOf("t.me/Miragespoofer") !== -1) return "admin";
    return "";
  }
  document.querySelectorAll(".nav-drawer a").forEach(function (link) {
    if (link.querySelector(".nav-ico")) return;
    var svg = ico[navKey(link.getAttribute("href"))];
    if (svg) link.insertAdjacentHTML("afterbegin", svg);
  });
})();
