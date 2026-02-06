document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".service-card");
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener("focusin", () => {
      card.classList.add("is-focused");
    });

    card.addEventListener("focusout", () => {
      card.classList.remove("is-focused");
    });
  });
});
