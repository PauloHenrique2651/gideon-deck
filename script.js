(function () {
  // Fixes the tilt effect on cards getting stuck after touch scroll ends,
  // since pointerleave doesn't reliably fire on touch devices.
  document.addEventListener('touchend', function (e) {
    var el = e.target.closest && e.target.closest('[style*="transform"]');
    if (el) {
      el.style.transform = '';
    }
  }, { passive: true });
  document.addEventListener('touchcancel', function (e) {
    var el = e.target.closest && e.target.closest('[style*="transform"]');
    if (el) {
      el.style.transform = '';
    }
  }, { passive: true });
})();

(function () {
  var btn = document.getElementById('__gideon_fab_btn');
  var wrap = document.getElementById('__gideon_fab_wrap');
  if (btn && wrap) {
    btn.addEventListener('click', function () {
      wrap.classList.toggle('__open');
    });
  }
})();
