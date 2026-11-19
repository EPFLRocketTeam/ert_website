function initReport(root) {
  const retry = root.querySelector("[data-retry]");
  const intro = root.querySelector("[data-intro]");
  const toolbar = root.querySelector("[data-toolbar]");
  const viewport = root.querySelector("[data-viewport]");
  const container = root.querySelector("[data-pages]");
  const status = root.querySelector("[data-status]");
  const previous = root.querySelector("[data-previous]");
  const next = root.querySelector("[data-next]");
  const pageForm = root.querySelector("[data-page-form]");
  const pageInput = root.querySelector("[data-page]");
  const pageCount = root.querySelector("[data-page-count]");
  const zoom = root.querySelector("[data-zoom]");
  const fullscreen = root.querySelector("[data-fullscreen]");
  const libraryBase = new URL(root.dataset.libraryBase, location.href);
  const pending = new Set();
  let pdf;
  let originalSize;
  let pages = [];
  let pageNumber = 1;
  let observer;
  let layoutVersion = 0;
  let rendering = false;
  let resizeTimer;

  function setStatus(message, error = false) {
    status.textContent = message;
    status.toggleAttribute("data-error", error);
  }

  function updateControls() {
    previous.disabled = pageNumber <= 1;
    next.disabled = pageNumber >= pdf.numPages;
    if (document.activeElement !== pageInput) pageInput.value = pageNumber;
  }

  function dimensionsFor(page) {
    const original = page.getViewport({ scale: 1 });
    const scale = zoom.value === "fit"
      ? Math.max(1, viewport.clientWidth - 32) / original.width
      : Number(zoom.value);
    return page.getViewport({ scale });
  }

  async function renderPending() {
    if (rendering) return;
    rendering = true;

    try {
      while (pending.size) {
        const record = pending.values().next().value;
        pending.delete(record);
        const version = layoutVersion;
        if (!record.visible || record.element.firstChild) continue;

        try {
          const page = await pdf.getPage(record.number);
          if (version !== layoutVersion || !record.visible) continue;
          const dimensions = dimensionsFor(page);
          record.element.style.width = `${dimensions.width}px`;
          record.element.style.height = `${dimensions.height}px`;
          // Bound canvas memory on high-DPI screens and at large zoom levels.
          const pixelRatio = Math.min(
            window.devicePixelRatio || 1,
            2,
            Math.sqrt(16000000 / (dimensions.width * dimensions.height)),
          );
          const canvas = document.createElement("canvas");
          canvas.width = Math.ceil(dimensions.width * pixelRatio);
          canvas.height = Math.ceil(dimensions.height * pixelRatio);
          canvas.style.width = `${dimensions.width}px`;
          canvas.style.height = `${dimensions.height}px`;
          canvas.setAttribute("role", "img");
          canvas.setAttribute("aria-label", `Report page ${record.number} of ${pdf.numPages}. Open the PDF for selectable text and document navigation.`);
          record.task = page.render({
            canvasContext: canvas.getContext("2d"),
            viewport: dimensions,
            transform: [pixelRatio, 0, 0, pixelRatio, 0, 0],
          });
          await record.task.promise;
          if (version === layoutVersion && record.visible) record.element.replaceChildren(canvas);
        } catch (error) {
          if (version !== layoutVersion || error.name === "RenderingCancelledException") continue;
          console.error(`Could not render report page ${record.number}.`, error);
          record.element.dataset.label = `Page ${record.number} could not be displayed. Use Open PDF above.`;
          setStatus(`Page ${record.number} could not be displayed. Use Open PDF / Download PDF above.`, true);
        } finally {
          record.task = null;
        }
      }
    } finally {
      rendering = false;
    }
  }

  function goToPage(number) {
    pageNumber = number;
    viewport.scrollTo({ top: pages[number - 1].element.offsetTop });
    pageInput.value = number;
    updateControls();
    setStatus(`Page ${number} of ${pdf.numPages}. Scroll to continue reading.`);
  }

  function layoutPages() {
    layoutVersion++;
    observer?.disconnect();
    pending.clear();
    for (const record of pages) record.task?.cancel();
    const scale = zoom.value === "fit"
      ? Math.max(1, viewport.clientWidth - 32) / originalSize.width
      : Number(zoom.value);
    const fragment = document.createDocumentFragment();
    pages = Array.from({ length: pdf.numPages }, (_, index) => {
      const element = document.createElement("div");
      element.className = "pdf-report__page";
      element.style.width = `${originalSize.width * scale}px`;
      element.style.height = `${originalSize.height * scale}px`;
      element.dataset.label = `Loading page ${index + 1}...`;
      element.dataset.page = index + 1;
      fragment.append(element);
      return { element, number: index + 1, visible: false, task: null };
    });
    container.replaceChildren(fragment);
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const record = pages[Number(entry.target.dataset.page) - 1];
        record.visible = entry.isIntersecting;
        if (record.visible) {
          pending.add(record);
        } else {
          pending.delete(record);
          record.task?.cancel();
          record.element.replaceChildren();
        }
      }
      renderPending();
    }, { root: viewport, rootMargin: "600px 0px" });
    pages.forEach(({ element }) => observer.observe(element));
    goToPage(pageNumber);
  }

  async function loadReport() {
    retry.hidden = true;
    setStatus("Loading the report reader...");
    let loadingTask;

    try {
      const pdfjs = await import(new URL("pdf.min.mjs", libraryBase).href);
      pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdf.worker.min.mjs", libraryBase).href;
      loadingTask = pdfjs.getDocument({
        url: root.dataset.src,
        cMapUrl: new URL("cmaps/", libraryBase).href,
        cMapPacked: true,
        standardFontDataUrl: new URL("standard_fonts/", libraryBase).href,
        wasmUrl: new URL("wasm/", libraryBase).href,
        // Fetch only requested byte ranges rather than the entire large report.
        disableAutoFetch: true,
        disableStream: true,
      });
      loadingTask.onProgress = ({ loaded, total }) => {
        setStatus(total
          ? `Loading report... ${Math.min(100, Math.round(loaded / total * 100))}%`
          : "Loading report...");
      };
      pdf = await loadingTask.promise;
      loadingTask.onProgress = null;
      originalSize = (await pdf.getPage(1)).getViewport({ scale: 1 });
      pageInput.max = pdf.numPages;
      pageCount.textContent = `of ${pdf.numPages}`;
      intro.hidden = true;
      toolbar.hidden = false;
      viewport.hidden = false;
      layoutPages();
    } catch (error) {
      console.error("Could not load the technical report.", error);
      setStatus("The reader could not load. Try again, or use Open PDF / Download PDF above.", true);
      intro.hidden = false;
      toolbar.hidden = true;
      viewport.hidden = true;
      retry.hidden = false;
      pdf = null;
      if (loadingTask) {
        try {
          await loadingTask.destroy();
        } catch (cleanupError) {
          console.error("Could not close the failed report reader.", cleanupError);
        }
      }
    }
  }

  retry.addEventListener("click", loadReport);
  fullscreen.hidden = !document.fullscreenEnabled;
  fullscreen.addEventListener("click", async () => {
    try {
      if (document.fullscreenElement === root) {
        await document.exitFullscreen();
      } else {
        await root.requestFullscreen();
      }
    } catch (error) {
      console.error("Could not change report fullscreen mode.", error);
      setStatus("Fullscreen is unavailable. You can continue reading here or use Open PDF above.", true);
    }
  });
  document.addEventListener("fullscreenchange", () => {
    const active = document.fullscreenElement === root;
    fullscreen.textContent = active ? "Exit fullscreen" : "Fullscreen";
    fullscreen.setAttribute("aria-pressed", String(active));
  });
  previous.addEventListener("click", () => {
    if (pageNumber > 1) goToPage(pageNumber - 1);
  });
  next.addEventListener("click", () => {
    if (pageNumber < pdf.numPages) goToPage(pageNumber + 1);
  });
  pageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (pageInput.reportValidity()) goToPage(pageInput.valueAsNumber);
  });
  zoom.addEventListener("change", layoutPages);
  viewport.addEventListener("scroll", () => {
    if (!pdf || !pages.length) return;
    const current = pages.findIndex(({ element }) =>
      element.offsetTop + element.offsetHeight > viewport.scrollTop + 24);
    if (current < 0 || current + 1 === pageNumber) return;
    pageNumber = current + 1;
    updateControls();
    setStatus(`Page ${pageNumber} of ${pdf.numPages}. Scroll to continue reading.`);
  }, { passive: true });

  let lastWidth = viewport.clientWidth;
  new ResizeObserver(() => {
    const width = viewport.clientWidth;
    if (width === lastWidth) return;
    lastWidth = width;
    if (!pdf || !originalSize || zoom.value !== "fit") return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layoutPages, 150);
  }).observe(viewport);

  loadReport();
}

document.querySelectorAll("[data-pdf-report]").forEach(initReport);
