document.getElementById("year").textContent = new Date().getFullYear();

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", (e) => {
  glow.style.setProperty("--x", `${e.clientX}px`);
  glow.style.setProperty("--y", `${e.clientY}px`);
}, {passive:true});

const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => link.addEventListener("click", e => {
  const el = document.querySelector(link.getAttribute("href"));
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({behavior:"smooth", block:"start"});
}));


// Gallery fullscreen viewer
const viewer = document.getElementById("imageViewer");
const viewerImage = document.getElementById("viewerImage");
const viewerLabel = document.getElementById("viewerLabel");
const viewerClose = viewer?.querySelector(".viewer-close");

document.querySelectorAll(".photo").forEach((photo) => {
  photo.addEventListener("click", () => {
    const img = photo.querySelector("img");
    if (!img || !viewer) return;
    viewerImage.src = img.currentSrc || img.src;
    viewerImage.alt = img.alt;
    viewerLabel.textContent = (photo.querySelector("figcaption")?.textContent || "GALLERY") + " / FULL VIEW";
    viewer.classList.add("open");
    viewer.setAttribute("aria-hidden", "false");
    document.body.classList.add("viewer-open");
  });
});

function closeViewer(){
  if (!viewer) return;
  viewer.classList.remove("open");
  viewer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("viewer-open");
  viewerImage.removeAttribute("src");
}
viewerClose?.addEventListener("click", closeViewer);
viewer?.addEventListener("click", (e) => { if (e.target === viewer) closeViewer(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeViewer(); });
