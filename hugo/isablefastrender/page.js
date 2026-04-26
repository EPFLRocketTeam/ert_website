document.addEventListener("DOMContentLoaded", function () {
  const projectImage = document.getElementById("project-image");
  const projectItems = document.querySelectorAll(
    "#our-projects > .our-project-list > div"
  );

  function highlightProject(index) {
    projectItems.forEach(function (el, i) {
      el.classList.toggle("highlighted-project", i === index);
    });
  }

  projectItems.forEach(function (el, i) {
    el.addEventListener("mouseenter", function () {
      if (projectImage && el.dataset.projectImage) {
        projectImage.src = el.dataset.projectImage;
      }
      highlightProject(i);
    });

    const imageUrl = el.dataset.projectImage;
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
    }
  });

  highlightProject(0);

  var groups = document.querySelectorAll('g');
  groups.forEach(function (group) {
    group.setAttribute('opacity', '0.4');
    group.addEventListener('mouseenter', function () {
      group.setAttribute('opacity', '1');
    });
    group.addEventListener('mouseleave', function () {
      group.setAttribute('opacity', '0.4');
    });
  });
});
