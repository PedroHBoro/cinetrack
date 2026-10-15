const TOTAL = 6;
const ASSISTIDOS = 3;
const ASSISTINDO = 1;
const QUERO = 2;

const btnTodos = document.querySelector("nav button:nth-child(1)");
const btnAssistido = document.querySelector("nav button:nth-child(2)");
const btnAssistindo = document.querySelector("nav button:nth-child(3)");
const btnQuero = document.querySelector("nav button:nth-child(4)");
const rodape = document.querySelector("footer small");

btnTodos.textContent = `Todos (${TOTAL})`;
btnAssistido.textContent = `Assistido (${ASSISTIDOS})`;
btnAssistindo.textContent = `Assistindo (${ASSISTINDO})`;
btnQuero.textContent = `Quero assistir (${QUERO})`;
rodape.textContent = `CineTrack © 2026 · ${TOTAL} filmes cadastrados`;

function rotuloStatus(status) {
    if (status === "assistido") return "Assistido";
    if (status === "assistindo") return "Assistindo";
    if (status === "quero") return "Quero assistir";
    return status;
}

const estrelas = (nota) => "★".repeat(nota) + "☆".repeat(5 - nota);

console.log(rotuloStatus("quero"), estrelas(3));

const primeiroCard = document.querySelector(".card");
primeiroCard.querySelector(".status").textContent = rotuloStatus("assistido");
primeiroCard.querySelector(".nota").textContent = `Nota: ${estrelas(4)}`;

