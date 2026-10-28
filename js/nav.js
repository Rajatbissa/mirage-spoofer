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
    var made = document.createElement("div");
    made.className = "made-in-india";
    made.setAttribute("aria-label", "Made in India");
    made.innerHTML = '<div class="india-float-card">'
      + '<img class="in-flag" src="' + asset("images/flag-india.svg") + '" width="32" height="21" alt="Flag of India">'
      + ' Made in India</div>';
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
    setup: '<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="3" fill="none"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    guide: '<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" fill="none"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill="none"/></svg>',
    download: '<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>',
    pricing: '<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    faq: '<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="none"/><path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4"/><path d="M12 17h.01"/></svg>',
    blog: '<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h6M7 16h8"/></svg>'
  };
  function navKey(href) {
    if (!href) return "";
    if (href.indexOf("blog") !== -1) return "blog";
    if (href.indexOf("setup") !== -1) return "setup";
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

  startDiwali();

  function startDiwali() {
    if (document.querySelector(".diwali-sky")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var canvas = document.createElement("canvas");
    canvas.className = "diwali-sky";
    canvas.setAttribute("aria-hidden", "true");
    document.body.insertBefore(canvas, document.body.firstChild);
    var sign = document.createElement("canvas");
    sign.className = "diwali-sign";
    sign.setAttribute("aria-hidden", "true");
    document.body.appendChild(sign);
    var ctx = canvas.getContext("2d");
    var sctx = sign.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var w = 0;
    var h = 0;
    var sparks = [];
    var rockets = [];
    var embers = [];
    var nextLaunch = 0;
    var mobile = false;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      mobile = w < 800;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      sign.width = canvas.width;
      sign.height = canvas.height;
      sign.style.width = w + "px";
      sign.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    var styles = ["peony", "willow", "ring", "chrys"];
    var palette = ["#ffd56a", "#ff8a3d", "#ff4d6d", "#fff6d0", "#ffb703", "#ff5a7a"];
    var banner = null;
    var nextBanner = performance.now() + 700;

    function addSpark(spark) {
      if (sparks.length > (mobile ? 380 : 640)) return;
      sparks.push(spark);
    }

    function burst(x, y, color, style) {
      style = style || styles[Math.floor(Math.random() * styles.length)];
      var count = style === "ring" ? (mobile ? 34 : 58) : (mobile ? 42 : 78);
      var i;
      for (i = 0; i < count; i++) {
        var angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.08;
        var speed = 1.6 + Math.random() * 2.8;
        var gravity = 0.018;
        var decay = 0.006 + Math.random() * 0.004;
        if (style === "willow") {
          speed = 0.6 + Math.random() * 1.5;
          gravity = 0.012;
          decay = 0.0035;
          angle += Math.random() * 0.4;
        } else if (style === "ring") {
          speed = 2.6 + Math.random() * 0.35;
        } else if (style === "chrys" && i % 2 === 0) {
          speed *= 0.55;
        }
        addSpark({
          x: x,
          y: y,
          px: x,
          py: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: decay,
          color: i % 7 === 0 ? "#fff8e6" : color,
          r: style === "willow" ? 1.1 : 1.5 + Math.random() * 0.8,
          gravity: gravity,
          crackle: style === "peony" && Math.random() > 0.86
        });
      }
    }

    function launch() {
      rockets.push({
        x: w * (0.18 + Math.random() * 0.64),
        y: h + 8,
        vx: (Math.random() - 0.5) * 0.55,
        vy: -(6.4 + Math.random() * 2.2),
        color: palette[Math.floor(Math.random() * palette.length)],
        style: styles[Math.floor(Math.random() * styles.length)],
        target: h * (0.16 + Math.random() * 0.28)
      });
    }

    function sampleBanner() {
      var off = document.createElement("canvas");
      var pen = off.getContext("2d");
      var size = mobile ? 28 : Math.min(46, Math.floor(w / 22));
      var font = "800 " + size + "px Outfit, sans-serif";
      pen.font = font;
      var tw = Math.ceil(pen.measureText("Happy Diwali").width) + 8;
      var th = Math.ceil(size * 1.25);
      off.width = Math.max(tw, 8);
      off.height = Math.max(th, 8);
      pen.font = font;
      pen.fillStyle = "#fff";
      pen.textBaseline = "top";
      pen.fillText("Happy Diwali", 4, 2);
      var data = pen.getImageData(0, 0, off.width, off.height).data;
      var step = 3;
      var pts = [];
      var y;
      var x;
      for (y = 0; y < off.height; y += step) {
        for (x = 0; x < off.width; x += step) {
          if (data[(y * off.width + x) * 4 + 3] > 140) pts.push({ x: x, y: y });
        }
      }
      return { pts: pts, tw: off.width, th: off.height };
    }

    function openBanner() {
      var sample = sampleBanner();
      if (!sample.pts.length) return;
      var ox = Math.max(64, w - sample.tw - Math.min(120, w * 0.08));
      var oy = Math.max(86, h * 0.11);
      var pieces = [];
      var i;
      for (i = 0; i < sample.pts.length; i++) {
        var p = sample.pts[i];
        pieces.push({
          x: ox + p.x + (Math.random() - 0.5) * 220,
          y: h * (0.55 + Math.random() * 0.4),
          tx: ox + p.x,
          ty: oy + p.y,
          color: i % 5 === 0 ? "#fff6d0" : (i % 2 ? "#ffd56a" : "#ff8a3d")
        });
      }
      banner = {
        pieces: pieces,
        born: performance.now(),
        form: 850,
        hold: 5000,
        fade: 800,
        ox: ox,
        oy: oy + sample.th * 0.72,
        th: sample.th
      };
      burst(ox + sample.tw * 0.2, oy + sample.th * 0.4, "#ffd56a", "ring");
      burst(ox + sample.tw * 0.8, oy + sample.th * 0.4, "#ff4d6d", "peony");
    }

    function drawDiya(x, y, scale, time, phase) {
      var flick = 0.82 + Math.sin(time * 7 + phase) * 0.1 + Math.sin(time * 15 + phase) * 0.05;
      var glow = ctx.createRadialGradient(x, y - 18 * scale, 2, x, y - 6 * scale, 78 * scale);
      glow.addColorStop(0, "rgba(255, 196, 90, 0.42)");
      glow.addColorStop(0.45, "rgba(255, 90, 20, 0.12)");
      glow.addColorStop(1, "rgba(255, 60, 0, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y - 10 * scale, 78 * scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
      ctx.beginPath();
      ctx.ellipse(x, y + 12 * scale, 24 * scale, 6 * scale, 0, 0, Math.PI * 2);
      ctx.fill();

      var pot = ctx.createLinearGradient(x - 20 * scale, y, x + 20 * scale, y + 8 * scale);
      pot.addColorStop(0, "#4a1c10");
      pot.addColorStop(0.45, "#a24a24");
      pot.addColorStop(1, "#3a140c");
      ctx.fillStyle = pot;
      ctx.beginPath();
      ctx.ellipse(x, y, 22 * scale, 11 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 196, 120, 0.45)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(x, y - 2 * scale, 16 * scale, 5 * scale, 0, Math.PI, 0);
      ctx.stroke();

      ctx.fillStyle = "#ff7a1a";
      ctx.beginPath();
      ctx.ellipse(x, y - 18 * scale * flick, 7 * scale, 18 * scale * flick, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffd56a";
      ctx.beginPath();
      ctx.ellipse(x, y - 14 * scale * flick, 3.4 * scale, 11 * scale * flick, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff8e4";
      ctx.beginPath();
      ctx.ellipse(x, y - 11 * scale * flick, 1.6 * scale, 6 * scale * flick, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    function frame(now) {
      if (document.hidden) {
        requestAnimationFrame(frame);
        return;
      }
      var time = now / 1000;
      ctx.clearRect(0, 0, w, h);
      sctx.clearRect(0, 0, w, h);

      var wash = ctx.createLinearGradient(0, h * 0.45, 0, h);
      wash.addColorStop(0, "rgba(0,0,0,0)");
      wash.addColorStop(1, "rgba(72, 22, 8, 0.22)");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, w, h);

      if (!banner && now > nextBanner) openBanner();
      if (!banner && now > nextLaunch && rockets.length < (mobile ? 2 : 3)) {
        launch();
        if (Math.random() > 0.55) launch();
        nextLaunch = now + 1400 + Math.random() * 1600;
      }

      var r;
      for (r = rockets.length - 1; r >= 0; r--) {
        var rocket = rockets[r];
        addSpark({
          x: rocket.x,
          y: rocket.y,
          px: rocket.x,
          py: rocket.y + 8,
          vx: (Math.random() - 0.5) * 0.35,
          vy: 0.8,
          life: 0.55,
          decay: 0.06,
          color: "#ffd27a",
          r: 1.2,
          gravity: 0.01,
          crackle: false
        });
        rocket.x += rocket.vx;
        rocket.y += rocket.vy;
        rocket.vy += 0.035;
        ctx.fillStyle = "#fff8e4";
        ctx.beginPath();
        ctx.arc(rocket.x, rocket.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
        if (rocket.y <= rocket.target || rocket.vy > -0.6) {
          burst(rocket.x, rocket.y, rocket.color, rocket.style);
          rockets.splice(r, 1);
        }
      }

      ctx.globalCompositeOperation = "lighter";
      var s;
      for (s = sparks.length - 1; s >= 0; s--) {
        var spark = sparks[s];
        spark.px = spark.x;
        spark.py = spark.y;
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy += spark.gravity || 0.02;
        spark.vx *= 0.992;
        spark.life -= spark.decay;
        if (spark.life <= 0) {
          if (spark.crackle) burst(spark.x, spark.y, "#fff6d0", "ring");
          sparks.splice(s, 1);
          continue;
        }
        ctx.strokeStyle = spark.color;
        ctx.globalAlpha = spark.life * 0.9;
        ctx.lineWidth = spark.r;
        ctx.beginPath();
        ctx.moveTo(spark.px, spark.py);
        ctx.lineTo(spark.x, spark.y);
        ctx.stroke();
        ctx.fillStyle = "#fff8e6";
        ctx.globalAlpha = spark.life;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, Math.max(0.6, spark.r * 0.45), 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      ctx.globalCompositeOperation = "source-over";

      if (banner) {
        var age = now - banner.born;
        var span = banner.form + banner.hold + banner.fade;
        var alpha = 1;
        if (age < banner.form) alpha = age / banner.form;
        else if (age > banner.form + banner.hold) alpha = 1 - (age - banner.form - banner.hold) / banner.fade;
        if (age >= span || alpha <= 0) {
          banner = null;
          nextBanner = now + 14000 + Math.random() * 4000;
        } else {
          var ease = age < banner.form ? 1 - Math.pow(1 - age / banner.form, 3) : 1;
          sctx.globalCompositeOperation = "lighter";
          var bi;
          for (bi = 0; bi < banner.pieces.length; bi++) {
            var bit = banner.pieces[bi];
            bit.x += (bit.tx - bit.x) * (0.08 + ease * 0.14);
            bit.y += (bit.ty - bit.y) * (0.08 + ease * 0.14);
            sctx.globalAlpha = Math.max(alpha, 0) * (0.8 + Math.sin(time * 9 + bi) * 0.2);
            sctx.fillStyle = bit.color;
            sctx.beginPath();
            sctx.arc(bit.x, bit.y, ease > 0.9 ? 2.4 : 2.8, 0, Math.PI * 2);
            sctx.fill();
          }
          sctx.globalAlpha = 1;
          sctx.globalCompositeOperation = "source-over";
          if (ease > 0.35) {
            var saved = ctx;
            ctx = sctx;
            drawDiya(banner.ox - 48, banner.oy, mobile ? 0.72 : 0.95, time, 0.6);
            ctx = saved;
          }
        }
      }

      if (embers.length < (mobile ? 16 : 32) && Math.random() > 0.45) {
        embers.push({
          x: Math.random() * w,
          y: h - 10,
          vx: (Math.random() - 0.5) * 0.35,
          vy: -(0.25 + Math.random() * 0.7),
          life: 1
        });
      }
      var e;
      for (e = embers.length - 1; e >= 0; e--) {
        var ember = embers[e];
        ember.x += ember.vx;
        ember.y += ember.vy;
        ember.life -= 0.005;
        if (ember.life <= 0) {
          embers.splice(e, 1);
          continue;
        }
        ctx.globalAlpha = ember.life * 0.65;
        ctx.fillStyle = "#ffb347";
        ctx.fillRect(ember.x, ember.y, 1.6, 1.6);
        ctx.globalAlpha = 1;
      }

      var lamps = banner
        ? []
        : (mobile
          ? [{ x: 0.9, y: 0.22, s: 0.95 }]
          : [
              { x: 0.8, y: 0.16, s: 0.8 },
              { x: 0.9, y: 0.28, s: 1.15 },
              { x: 0.97, y: 0.14, s: 0.7 }
            ]);
      var d;
      for (d = 0; d < lamps.length; d++) {
        drawDiya(lamps[d].x * w, lamps[d].y * h, lamps[d].s, time, d * 1.4);
      }

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
})();
