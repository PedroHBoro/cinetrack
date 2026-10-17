const filmesIniciais = [
    {
        id: 1,
        titulo: "Interestelar",
        ano: 2014,
        genero: "Ficção científica",
        poster: "https://www.themoviedb.org/t/p/w200/6ricSDD83BClJsFdGB6x7cM0MFQ.jpg",
        nota: 5,
        status: "assistido",
        comentario: "Excelente filme de ficção científica."
    },
    {
        id: 2,
        titulo: "Harry Potter e o Prisioneiro de Azkaban",
        ano: 2004,
        genero: "Fantasia",
        poster: "https://www.themoviedb.org/t/p/w200/1HdMUghqlgOIvbsU9ZtO40IPRzl.jpg",
        nota: 5,
        status: "assistido",
        comentario: "Um dos melhores filmes da franquia."
    },
    {
        id: 3,
        titulo: "Devoradores de Estrelas",
        ano: 2026,
        genero: "Ficção científica",
        poster: "https://www.themoviedb.org/t/p/w200/2i8uru7rlbHKaoIbC2V4FZLT7uW.jpg",
        nota: 4,
        status: "quero",
        comentario: "Muito aguardado!"
    },
    {
        id: 4,
        titulo: "Bee Movie",
        ano: 2007,
        genero: "Animação / Comédia",
        poster: "https://www.themoviedb.org/t/p/w200/puW6ynGLcCowqiYvhPhdbNH8Zzj.jpg",
        nota: 3,
        status: "assistido",
        comentario: "Segundo as leis da aviação..."
    },
    {
        id: 5,
        titulo: "O Segredo dos Animais",
        ano: 2006,
        genero: "Animação / Comédia",
        poster: "https://www.themoviedb.org/t/p/w200/iNvWEuE4iRHT7qQJToK2cVW8GBi.jpg",
        nota: 4,
        status: "assistindo",
        comentario: "Muito divertido."
    },
    {
        id: 6,
        titulo: "Os Sem-Floresta",
        ano: 2006,
        genero: "Animação / Aventura",
        poster: "https://www.themoviedb.org/t/p/w200/ozigu0Uu5G8s4e3FzyMhHivgRX0.jpg",
        nota: 4,
        status: "quero",
        comentario: "Clássico da infância."
    }
];

let filmes = [...filmesIniciais];

const lista = document.querySelector("#lista");
const nav = document.querySelector("nav");

const TOTAL = filmes.length;
const ASSISTIDOS = filmes.filter(f => f.status === "assistido").length;
const ASSISTINDO = filmes.filter(f => f.status === "assistindo").length;
const QUERO = filmes.filter(f => f.status === "quero").length;

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

function renderizarCards(listaFilmes) {
    const cards = listaFilmes
        .map(
            (f) => `
    <article class="card" data-id="${f.id}">
        <img src="${f.poster}" alt="${f.titulo}">
        <div class="card-info">
            <h2 class="titulo">${f.titulo}</h2>
            <div class="card-inner">
                <div>
                    <span class="ano">${f.ano}</span>
                    &bull;
                    <span class="genero">${f.genero}</span>
                </div>
                <p class="nota">Nota: ${estrelas(f.nota)}</p>
                <span class="status">${rotuloStatus(f.status)}</span>
            </div>
            <div class="card-actions">
                <button class="btn-editar">Editar</button>
                <button class="btn-remover">Remover</button>
            </div>
        </div>
    </article>
    `
        )
        .join("");

    lista.innerHTML = cards;
}

lista.addEventListener("click", (e) => {
    const botao = e.target.closest(".btn-remover");
    if (!botao) return;

    if (!confirm("Remover este filme?")) return;

    const card = botao.closest(".card");
    const id = Number(card.dataset.id);
    filmes = filmes.filter((f) => f.id !== id);

    renderizarCards(filmes);
});

nav.addEventListener("click", (e) => {
    const botao = e.target.closest("button");
    if (!botao) return;

    nav.querySelector(".ativo").classList.remove("ativo");
    botao.classList.add("ativo");

    const status = botao.dataset.status;

    renderizarCards(filmes.filter((f) => status === "todos" || f.status === status));
});

renderizarCards(filmes);