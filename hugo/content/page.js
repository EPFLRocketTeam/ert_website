  const numToProject = {
    1: "op-firehorn",
    2: "op-spacerace",
    3: "op-icarus",
    4: "op-hyperion"
  }
  function setProjectImage(filename) {
    document.getElementById("project-image").src = filename;
  }
  function highlightProject(projNum) {
    Object.values(numToProject).forEach(proj => {
      document.getElementById(proj).classList.remove("highlighted-project");
    })
    document.getElementById(numToProject[projNum]).classList.add("highlighted-project");
  }
  highlightProject(1)
