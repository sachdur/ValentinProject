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
let nbClicsNon = 0; // ✅ compteur de clics sur "Non"

function handleNoClick() {
  const noButton = document.querySelector(".no-button");
  const yesButton = document.querySelector(".yes-button");
  if (!noButton || !yesButton) return;

  nbClicsNon += 1;

  // Au 10e clic, on supprime (ou on cache) le bouton "Non"
  if (nbClicsNon >= 11) {
    noButton.remove();          // ✅ supprime du DOM
    // ou à la place : noButton.style.display = "none"; // ✅ cache
    return;
  }

  // Change le texte du bouton "Non"
  noButton.textContent = messages[messageIndex];
  messageIndex = (messageIndex + 1) % messages.length;

  // Agrandit le bouton "Oui" (avec limite)
  const style = window.getComputedStyle(yesButton);
  const currentSizePx = parseFloat(style.fontSize) || 24;
  const nextSizePx = Math.min(currentSizePx * 1.25, 1000);
  yesButton.style.fontSize = `${nextSizePx}px`;
}

function handleYesClick() {
  window.location.href = "./yes_page.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const noButton = document.querySelector(".no-button");
  const yesButton = document.querySelector(".yes-button");

  if (noButton) noButton.addEventListener("click", handleNoClick);
  if (yesButton) yesButton.addEventListener("click", handleYesClick);
});
