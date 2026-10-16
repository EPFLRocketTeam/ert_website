// Animates ".number-row-target" elements (used by the number_in_row shortcode)
// from 0 up to their target value once they scroll into view.
// Uses anime.js (already loaded site-wide) and respects prefers-reduced-motion.
(function () {
  function parseTarget(text) {
    var match = text.match(/[\d.,]+/);
    if (!match) return null;
    var numStr = match[0].replace(/,/g, "");
    var value = parseFloat(numStr);
    if (isNaN(value)) return null;
    var decimals = (numStr.split(".")[1] || "").length;
    return {
      value: value,
      prefix: text.slice(0, match.index),
      suffix: text.slice(match.index + match[0].length),
      decimals: decimals
    };
  }

  function animateEl(el) {
    var parsed = parseTarget(el.textContent.trim());
    if (!parsed) return;

    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || typeof anime === "undefined") {
      el.textContent = parsed.prefix + (parsed.decimals ? parsed.value.toFixed(parsed.decimals) : parsed.value) + parsed.suffix;
      return;
    }

    var obj = { val: 0 };
    anime({
      targets: obj,
      val: parsed.value,
      round: parsed.decimals ? Math.pow(10, parsed.decimals) : 1,
      duration: 1400,
      easing: "easeOutExpo",
      update: function () {
        var v = parsed.decimals ? obj.val.toFixed(parsed.decimals) : Math.round(obj.val);
        el.textContent = parsed.prefix + v + parsed.suffix;
      }
    });
  }

  function init() {
    var targets = document.querySelectorAll(".number-row-target");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach(animateEl);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateEl(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    targets.forEach(function (el) { observer.observe(el); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
