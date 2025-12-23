export function setupLocationToggle() {
  const locationBtn = document.querySelector(".location__city");
  const locationName = locationBtn?.querySelector(".location__city-name");
  const locationSublinks = document.querySelectorAll(".location__sublink");

  if (!locationBtn) return;

  locationBtn.addEventListener("click", (e) => {
    if (e.target.closest(".location__sublink")) return;

    locationBtn.classList.toggle("location__city--active");

    const expanded = locationBtn.classList.contains("location__city--active");
    locationBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
  });

  if (locationSublinks?.length) {
    locationSublinks.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const text = btn.textContent.trim();

        if (locationName) {
          locationName.textContent = text;
        }
        locationBtn.classList.remove("location__city--active");
        locationBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.addEventListener("click", (e) => {
    if (
      locationBtn.classList.contains("location__city--active") &&
      !locationBtn.contains(e.target)
    ) {
      locationBtn.classList.remove("location__city--active");
      locationBtn.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && locationBtn.classList.contains("location__city--active")) {
      locationBtn.classList.remove("location__city--active");
      locationBtn.setAttribute("aria-expanded", "false");
      locationBtn.focus();
    }
  });
}
