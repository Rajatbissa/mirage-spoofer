(function () {
  var params = new URLSearchParams(window.location.search);
  var query = (params.get("q") || "").trim();
  var input = document.querySelector("[data-search-page-input]");
  var statusEl = document.querySelector("[data-search-status]");
  var listEl = document.querySelector("[data-search-results]");
  if (input) input.value = query;

  function normalize(value) {
    return String(value || "").toLowerCase();
  }

  function scoreItem(item, q) {
    var hay = normalize(item.title + " " + item.text + " " + (item.tags || []).join(" "));
    if (!q) return 0;
    if (hay.indexOf(q) !== -1) return q.length + (normalize(item.title).indexOf(q) === 0 ? 10 : 0);
    return q.split(/\s+/).every(function (part) { return hay.indexOf(part) !== -1; }) ? 1 : 0;
  }

  function render(items, q) {
    if (!listEl || !statusEl) return;
    if (!q) {
      statusEl.textContent = "Type a keyword such as root, root module, spoofer, or RTC.";
      listEl.innerHTML = "";
      return;
    }
    if (!items.length) {
      statusEl.textContent = "No results for “" + q + "”.";
      listEl.innerHTML = "";
      return;
    }
    statusEl.textContent = items.length + " result" + (items.length === 1 ? "" : "s") + " for “" + q + "”.";
    listEl.innerHTML = items.map(function (item) {
      return '<article class="result-card"><a href="' + item.url + '"><h2>' + item.title +
        "</h2><p>" + item.text + "</p></a></article>";
    }).join("");
  }

  var items = (window.MIRAGE_SEARCH_INDEX || []).slice();
  var q = normalize(query);
  var ranked = items.map(function (item) {
    return { item: item, score: scoreItem(item, q) };
  }).filter(function (row) { return row.score > 0; })
    .sort(function (a, b) { return b.score - a.score; })
    .map(function (row) { return row.item; });

  render(ranked, query);

  var cfg = window.MIRAGE_CLOUDINARY || {};
  if (cfg.cloudName && query) {
    var tag = cfg.tag || "mirage_guide";
    Promise.all([
      fetch("https://res.cloudinary.com/" + cfg.cloudName + "/image/list/" + tag + ".json").then(function (r) { return r.ok ? r.json() : { resources: [] }; }).catch(function () { return { resources: [] }; }),
      fetch("https://res.cloudinary.com/" + cfg.cloudName + "/video/list/" + tag + ".json").then(function (r) { return r.ok ? r.json() : { resources: [] }; }).catch(function () { return { resources: [] }; })
    ]).then(function (lists) {
      var extra = [];
      lists.forEach(function (pack, idx) {
        (pack.resources || []).forEach(function (asset) {
          var ctx = asset.context && asset.context.custom ? asset.context.custom : {};
          var title = ctx.caption || ctx.alt || asset.public_id;
          var tags = (asset.tags || []).join(" ");
          var hay = normalize(title + " " + tags + " " + (asset.public_id || ""));
          if (hay.indexOf(q) === -1) return;
          extra.push({
            title: (idx === 1 ? "Video: " : "Photo: ") + title,
            url: "guide.html#gallery",
            text: tags || "Guide media",
            tags: asset.tags || []
          });
        });
      });
      if (extra.length) {
        render(ranked.concat(extra), query);
      }
    });
  }
})();
