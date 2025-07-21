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
  const imageUrl = element.dataset.projectImage; // Access the data-project-image attribute
  if (imageUrl) {
    imageUrlsToPrefetch.push(imageUrl);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  prefetchImages(imageUrlsToPrefetch);
});

// Your setProjectImage function can now directly use the passed imagePath
function setProjectImage(imagePath) {
  document.getElementById("project-image").src = imagePath;
}

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
