// script.js

const messages = [
  "Tu es sûr(e) ?",
  "Vraiment sûr(e) ??",
  "Certain(e) à 100% ?",
  "S’il te plaît… 🥺",
  "Réfléchis bien…",
  "Si tu dis non, je vais être triste…",
  "Je vais être très triste…",
  "Je vais être très très très triste…",
  "Ok… j’arrête de demander…",
  "Je plaisante 😄 dis oui s’il te plaît ❤️"
];

let messageIndex = 0;

function handleNoClick() {
  const noButton = document.querySelector(".no-button");
  const yesButton = document.querySelector(".yes-button");
  if (!noButton || !yesButton) return;

  // Change le texte du bouton "Non"
  noButton.textContent = messages[messageIndex];
  messageIndex = (messageIndex + 1) % messages.length;

  // Agrandit le bouton "Oui" (avec une limite pour éviter de casser la page)
  const style = window.getComputedStyle(yesButton);
  const currentSizePx = parseFloat(style.fontSize) || 24;
  const nextSizePx = Math.min(currentSizePx * 1.25, 96); // limite à 96px
  yesButton.style.fontSize = `${nextSizePx}px`;
}

function handleYesClick() {
  // Redirection vers la page "oui"
  window.location.href = "./yes_page.html";
}

// Liaison automatique des boutons au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  const noButton = document.querySelector(".no-button");
  const yesButton = document.querySelector(".yes-button");

  if (noButton) noButton.addEventListener("click", handleNoClick);
  if (yesButton) yesButton.addEventListener("click", handleYesClick);
});
