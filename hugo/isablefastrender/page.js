document.addEventListener("DOMContentLoaded", function () {
  var groups = document.querySelectorAll('g');
  groups.forEach(function (group) {
    group.setAttribute('opacity', '0.4');
    group.addEventListener('mouseenter', function () { group.setAttribute('opacity', '1'); });
    group.addEventListener('mouseleave', function () { group.setAttribute('opacity', '0.4'); });
  });
});
