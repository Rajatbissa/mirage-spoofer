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
    return /\/(legal|admin|docs|blog)(\/|$)/.test(path) ? "../" + name : name;
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
  if (!footer) {
    footer = document.createElement("footer");
    footer.className = "site-footer";
    document.body.appendChild(footer);
  }
  if (footer && !footer.querySelector(".footer-brand")) {
    var brand = document.createElement("p");
    brand.className = "footer-brand";
    brand.innerHTML = '<img src="' + asset("logo-mark.png") + '" width="28" height="28" alt=""> <strong>Mirage Spoofer</strong>';
    footer.insertBefore(brand, footer.firstChild);
  }
  if (footer && !footer.querySelector(".made-in-india")) {
    var spokes = "";
    for (var s = 0; s < 24; s++) {
      var a = (s * 15) * Math.PI / 180;
      spokes += '<line x1="' + (45 + Math.sin(a) * 5.2).toFixed(2)
        + '" y1="' + (30 - Math.cos(a) * 5.2).toFixed(2)
        + '" x2="' + (45 + Math.sin(a) * 13.4).toFixed(2)
        + '" y2="' + (30 - Math.cos(a) * 13.4).toFixed(2) + '"/>';
    }
    var made = document.createElement("div");
    made.className = "made-in-india";
    made.setAttribute("aria-label", "Made in India");
    made.innerHTML = '<div class="india-float-card" aria-hidden="true">'
      + '<div class="india-flag"><span class="flag-pole"></span>'
      + '<div class="flag-cloth"><svg viewBox="0 0 90 60" width="72" height="48">'
      + '<defs><filter id="indiaFlagWind" x="-8%" y="-18%" width="120%" height="136%">'
      + '<feTurbulence type="fractalNoise" baseFrequency="0.012 0.22" numOctaves="2" seed="3" result="n">'
      + '<animate attributeName="baseFrequency" dur="2.2s" values="0.01 0.18;0.018 0.32;0.01 0.18" repeatCount="indefinite"/>'
      + '</feTurbulence>'
      + '<feDisplacementMap in="SourceGraphic" in2="n" scale="3.4" xChannelSelector="R" yChannelSelector="G"/>'
      + '</filter></defs>'
      + '<g filter="url(#indiaFlagWind)">'
      + '<rect width="90" height="20" fill="#FF9933"/>'
      + '<rect y="20" width="90" height="20" fill="#FFFFFF"/>'
      + '<rect y="40" width="90" height="20" fill="#138808"/>'
      + '<g fill="none" stroke="#000080" stroke-width="1.2" stroke-linecap="round">'
      + '<circle cx="45" cy="30" r="14.4"/>'
      + '<circle cx="45" cy="30" r="3.1" fill="#000080" stroke="none"/>'
      + spokes + '</g></g></svg></div></div>'
      + '<div class="india-copy"><span>Made in</span><strong>India</strong></div>'
      + '</div>';
    footer.appendChild(made);
  }

  if (!document.querySelector(".fx-orbs")) {
    var orbs = document.createElement("div");
    orbs.className = "fx-orbs";
    orbs.setAttribute("aria-hidden", "true");
    orbs.innerHTML = '<span class="orb orb-a"></span><span class="orb orb-b"></span><span class="orb orb-c"></span>';
    document.body.insertBefore(orbs, document.body.firstChild);
  }

  var ico = {
    features: '<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1" fill="none"/><rect x="14" y="3" width="7" height="7" rx="1" fill="none"/><rect x="3" y="14" width="7" height="7" rx="1" fill="none"/><rect x="14" y="14" width="7" height="7" rx="1" fill="none"/></svg>',
    guide: '<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" fill="none"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill="none"/></svg>',
    download: '<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>',
    pricing: '<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    faq: '<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="none"/><path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4"/><path d="M12 17h.01"/></svg>',
    blog: '<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h6M7 16h8"/></svg>'
  };
  function navKey(href) {
    if (!href) return "";
    if (href.indexOf("blog") !== -1) return "blog";
    if (href.indexOf("features") !== -1) return "features";
    if (href.indexOf("guide") !== -1) return "guide";
    if (href.indexOf("download") !== -1) return "download";
    if (href.indexOf("pricing") !== -1) return "pricing";
    if (href.indexOf("faq") !== -1) return "faq";
    return "";
  }
  document.querySelectorAll(".nav-drawer a").forEach(function (link) {
    if (link.classList.contains("btn-solid") || link.classList.contains("btn-ghost")) return;
    if (link.querySelector(".nav-ico")) return;
    var key = navKey(link.getAttribute("href"));
    if (!key && (link.textContent || "").replace(/\s+/g, " ").trim() === "Blog") key = "blog";
    var svg = ico[key];
    if (svg) link.insertAdjacentHTML("afterbegin", svg);
  });
})();
