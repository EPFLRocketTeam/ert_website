function setProjectImage(imagePath) {
  document.getElementById("project-image").src = imagePath;
}

// Your highlightProject function
function highlightProject(projectNumber) {
  const projectElements = document.querySelectorAll(
    "#our-projects > .our-project-list > div"
  );
  projectElements.forEach((element, index) => {
    if (index + 1 === projectNumber) {
      element.classList.add("highlighted-project");
    } else {
      element.classList.remove("highlighted-project");
    }
  });
}
document.addEventListener("DOMContentLoaded", function () {
  // Prefetching functions and variable declarations
  function prefetchImages(imageUrls) {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }

  const imageUrlsToPrefetch = [];
  const projectElements = document.querySelectorAll(
    "#our-projects > .our-project-list > div"
  );

  projectElements.forEach((element) => {
    const imageUrl = element.dataset.projectImage;
    if (imageUrl) {
      imageUrlsToPrefetch.push(imageUrl);
    }
  });

  // Execute prefetching directly within DOMContentLoaded
  prefetchImages(imageUrlsToPrefetch);


  // Initial highlight (now part of the same DOMContentLoaded)
  highlightProject(1);

  // SVG opacity logic (also part of the same DOMContentLoaded)
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
