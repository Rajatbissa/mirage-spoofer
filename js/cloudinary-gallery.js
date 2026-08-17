(function () {
  var grid = document.querySelector("[data-guide-gallery]");
  var note = document.querySelector("[data-gallery-note]");
  if (!grid) return;

  var cfg = window.MIRAGE_CLOUDINARY || {};
  if (!cfg.cloudName) {
    if (note) note.textContent = "Photo and video uploads appear here after Cloudinary cloud name is added.";
    return;
  }

  var tag = cfg.tag || "mirage_guide";
  var cloud = cfg.cloudName;

  function urlFor(asset, resourceType) {
    return "https://res.cloudinary.com/" + cloud + "/" + resourceType + "/upload/" + asset.public_id + "." + asset.format;
  }

  function caption(asset) {
    var ctx = asset.context && asset.context.custom ? asset.context.custom : {};
    return ctx.caption || ctx.alt || asset.public_id;
  }

  Promise.all([
    fetch("https://res.cloudinary.com/" + cloud + "/image/list/" + tag + ".json").then(function (r) { return r.ok ? r.json() : { resources: [] }; }).catch(function () { return { resources: [] }; }),
    fetch("https://res.cloudinary.com/" + cloud + "/video/list/" + tag + ".json").then(function (r) { return r.ok ? r.json() : { resources: [] }; }).catch(function () { return { resources: [] }; })
  ]).then(function (packs) {
    var html = "";
    (packs[0].resources || []).forEach(function (asset) {
      var src = urlFor(asset, "image");
      html += '<figure class="media-card"><a href="' + src + '" target="_blank" rel="noopener"><img src="' + src + '" alt="' + caption(asset) + '"></a><figcaption>' + caption(asset) + "</figcaption></figure>";
    });
    (packs[1].resources || []).forEach(function (asset) {
      var src = urlFor(asset, "video");
      html += '<figure class="media-card"><video controls preload="metadata" src="' + src + '"></video><figcaption>' + caption(asset) + "</figcaption></figure>";
    });
    if (!html) {
      if (note) note.textContent = "No tagged media yet. Upload from the admin page.";
      return;
    }
    if (note) note.textContent = "";
    grid.innerHTML = html;
  });
})();
