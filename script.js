const scrollButton = document.querySelector("[data-scroll-target]");

if (scrollButton) {
  scrollButton.addEventListener("click", () => {
    const target = document.getElementById(scrollButton.dataset.scrollTarget);

    if (target) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }
  });
}
