function checkOrientation() {
  const notice = document.getElementById("rotate-notice");
  if (window.innerHeight > window.innerWidth && window.innerWidth <= 1024) {
    // Portrait mode on mobile/tablet
    notice.style.display = "block";
  } else {
    // Landscape or desktop
    notice.style.display = "none";
  }
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("load", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
