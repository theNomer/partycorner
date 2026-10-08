// Opened straight from disk (file://) the browser won't turn "truth-or-dare/" into
// "truth-or-dare/index.html" like GitHub Pages does, so add it to folder links there.
// Online the links stay short.
if (location.protocol === "file:") {
  for (const link of document.querySelectorAll('a[href$="/"]')) {
    const href = link.getAttribute("href");
    if (!href.includes("://")) {
      link.setAttribute("href", href + "index.html");
    }
  }
}
