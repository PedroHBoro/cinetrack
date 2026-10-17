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

const btnTodos = document.querySelector("nav button:nth-child(1)");
const btnAssistido = document.querySelector("nav button:nth-child(2)");
const btnAssistindo = document.querySelector("nav button:nth-child(3)");
const btnQuero = document.querySelector("nav button:nth-child(4)");
const rodape = document.querySelector("footer small");

function rotuloStatus(status) {
    if (status === "assistido") return "Assistido";
    if (status === "assistindo") return "Assistindo";
    if (status === "quero") return "Quero assistir";
    return status;
}

const estrelas = (nota) => "★".repeat(nota) + "☆".repeat(5 - nota);

const gerarId = (listaFilmes) =>
    Math.max(0, ...listaFilmes.map((f) => f.id)) + 1;

function validarFilme(filme) {
    const erros = [];
    if (!filme.titulo) erros.push("Título obrigatório");
    if (filme.ano < 1888 || filme.ano > 2030) erros.push("Ano inválido");
    return { valido: erros.length === 0, erros };
}

function criarCard(f) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = f.id;

    const img = document.createElement("img");
    img.src = f.poster;
    img.alt = f.titulo;

    const info = document.createElement("div");
    info.className = "card-info";

    const titulo = document.createElement("h2");
    titulo.className = "titulo";
    titulo.textContent = f.titulo;

    const inner = document.createElement("div");
    inner.className = "card-inner";

    const meta = document.createElement("div");
    const ano = document.createElement("span");
    ano.className = "ano";
    ano.textContent = f.ano;
    const genero = document.createElement("span");
    genero.className = "genero";
    genero.textContent = f.genero;
    meta.append(ano, " • ", genero);

    const nota = document.createElement("p");
    nota.className = "nota";
    nota.textContent = `Nota: ${estrelas(f.nota)}`;

    const status = document.createElement("span");
    status.className = "status";
    status.textContent = rotuloStatus(f.status);

    inner.append(meta, nota, status);

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const btnEditar = document.createElement("button");
    btnEditar.className = "btn-editar";
    btnEditar.textContent = "Editar";

    const btnRemover = document.createElement("button");
    btnRemover.className = "btn-remover";
    btnRemover.textContent = "Remover";

    actions.append(btnEditar, btnRemover);
    info.append(titulo, inner, actions);
    card.append(img, info);
    return card;
}

function renderizarCards(listaFilmes) {
    const frag = document.createDocumentFragment();
    listaFilmes.forEach((f) => frag.appendChild(criarCard(f)));
    lista.replaceChildren(frag);

    btnTodos.textContent = `Todos (${filmes.length})`;
    btnAssistido.textContent = `Assistido (${filmes.filter(f => f.status === "assistido").length})`;
    btnAssistindo.textContent = `Assistindo (${filmes.filter(f => f.status === "assistindo").length})`;
    btnQuero.textContent = `Quero assistir (${filmes.filter(f => f.status === "quero").length})`;
    rodape.textContent = `CineTrack © 2026 · ${filmes.length} filmes cadastrados`;
}

let editandoId = null;
const modal = document.querySelector("#modal");
const form = document.querySelector("#form-filme");
const abrir = () => (modal.hidden = false);
const fechar = () => (modal.hidden = true);

function preencherFormulario(filme) {
    form.elements.titulo.value = filme.titulo;
    form.elements.ano.value = filme.ano;
    form.elements.genero.value = filme.genero;
    form.elements.poster.value = filme.poster ?? "";
    form.elements.status.value = filme.status;
    form.elements.nota.value = filme.nota ?? "";
    form.elements.comentario.value = filme.comentario ?? "";
}

document.querySelector("header button").addEventListener("click", () => {
    editandoId = null;
    form.reset();
    abrir();
});

form.querySelector("button[type=button]").addEventListener("click", fechar);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) {
        fechar();
    }
});

lista.addEventListener("click", (e) => {
    const botao = e.target.closest(".btn-remover");
    if (!botao) return;

    if (!confirm("Remover este filme?")) return;

    const card = botao.closest(".card");
    const id = Number(card.dataset.id);
    filmes = filmes.filter((f) => f.id !== id);

    renderizarCards(filmes);
});

lista.addEventListener("click", (e) => {
    const botao = e.target.closest(".btn-editar");
    if (!botao) return;

    const card = botao.closest(".card");
    editandoId = Number(card.dataset.id);
    const filme = filmes.find((x) => x.id === editandoId);
    preencherFormulario(filme);
    abrir();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const dados = Object.fromEntries(new FormData(form));
    dados.ano = Number(dados.ano);
    dados.nota = Number(dados.nota);

    const { valido, erros } = validarFilme(dados);
    if (!valido) {
        alert(erros.join("\n"));
        return;
    }

    if (editandoId !== null) {
        filmes = filmes.map((f) =>
            f.id === editandoId ? { ...f, ...dados } : f
        );
    } else {
        filmes = [...filmes, { id: gerarId(filmes), ...dados }];
    }

    renderizarCards(filmes);
    fechar();
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