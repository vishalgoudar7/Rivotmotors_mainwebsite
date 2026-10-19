(function () {
  try {
    var saved = localStorage.getItem("rivot-theme-mode");
    var theme = saved === "dark" || saved === "light"
      ? saved
      : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    document.documentElement.dataset.rivotTheme = theme;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (error) {
    // Keep the server-rendered light theme when browser storage is unavailable.
  }
})();
