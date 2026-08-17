(function () {
  var cfg = window.MIRAGE_CLOUDINARY || {};
  var gate = document.querySelector("[data-admin-gate]");
  var panel = document.querySelector("[data-admin-panel]");
  var form = document.querySelector("[data-pin-form]");
  var statusEl = document.querySelector("[data-upload-status]");
  var openBtn = document.querySelector("[data-open-widget]");

  function unlocked() {
    return sessionStorage.getItem("mirage_admin") === "1";
  }

  function showPanel() {
    if (gate) gate.hidden = true;
    if (panel) panel.hidden = false;
  }

  if (unlocked()) showPanel();

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var pin = (form.querySelector("input[name='pin']") || {}).value || "";
      if (pin && pin === cfg.adminPin) {
        sessionStorage.setItem("mirage_admin", "1");
        showPanel();
      } else {
        var err = form.querySelector("[data-pin-error]");
        if (err) err.textContent = "Wrong PIN.";
      }
    });
  }

  if (!openBtn) return;

  openBtn.addEventListener("click", function () {
    if (!cfg.cloudName) {
      if (statusEl) statusEl.textContent = "Add cloudName in js/cloudinary-config.js first.";
      return;
    }
    if (typeof cloudinary === "undefined") {
      if (statusEl) statusEl.textContent = "Cloudinary widget failed to load. Check internet.";
      return;
    }

    var title = (document.querySelector("[name='mediaTitle']") || {}).value || "";
    var caption = (document.querySelector("[name='mediaCaption']") || {}).value || title;
    var tagsRaw = (document.querySelector("[name='mediaTags']") || {}).value || "";
    var extraTags = tagsRaw.split(",").map(function (t) { return t.trim(); }).filter(Boolean);
    var tags = [cfg.tag || "mirage_guide"].concat(extraTags);

    var widget = cloudinary.createUploadWidget({
      cloudName: cfg.cloudName,
      uploadPreset: cfg.uploadPreset,
      folder: cfg.folder,
      tags: tags,
      sources: ["local"],
      resourceType: "auto",
      clientAllowedFormats: ["png", "jpg", "jpeg", "webp", "mp4", "webm"],
      maxFileSize: 80000000,
      multiple: true,
      context: { caption: caption, alt: title || caption }
    }, function (error, result) {
      if (error) {
        if (statusEl) statusEl.textContent = "Upload error. Check preset and folder settings.";
        return;
      }
      if (result && result.event === "success") {
        if (statusEl) statusEl.textContent = "Uploaded: " + (result.info.original_filename || result.info.public_id) + ". It will show on the Guide page (resource list may take about a minute).";
      }
    });
    widget.open();
  });
})();
