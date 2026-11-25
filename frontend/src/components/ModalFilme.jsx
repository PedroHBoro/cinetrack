import { useState } from "react";

const VAZIO = {
  titulo: "",
  ano: "",
  genero: "",
  poster: "",
  status: "quero",
  nota: 3,
  comentario: "",
};

export default function ModalFilme({ filme, aoSalvar, aoFechar }) {
  const [dados, setDados] = useState({
    ...VAZIO,
    ...filme,
  });

  function atualizar(campo, valor) {
    setDados((anteriores) => ({
      ...anteriores,
      [campo]: valor,
    }));
  }

  function submeter(evento) {
    evento.preventDefault();
    const filmeEnviado = {
      ...dados,
      ano: Number(dados.ano),
      nota: Number(dados.nota),
    };
    if (!filmeEnviado.titulo) {
      alert("Título obrigatório");
      return;
    }
    if (filmeEnviado.ano < 1888 || filmeEnviado.ano > 2030) {
      alert("Ano inválido");
      return;
    }
    aoSalvar(filmeEnviado);
  }

  return (
    <div id="modal">
      <div className="modal-content">
        <h1>{filme.id ? "Editar filme" : "Adicionar filme"}</h1>
        <form onSubmit={submeter}>
          <p>
            <label>
              Título
              <br />
              <input
                required
                value={dados.titulo}
                onChange={(e) => atualizar("titulo", e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Ano
              <br />
              <input
                required
                type="number"
                min="1888"
                max="2030"
                value={dados.ano}
                onChange={(e) => atualizar("ano", e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Gênero
              <br />
              <input
                required
                value={dados.genero}
                onChange={(e) => atualizar("genero", e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              URL do pôster (opcional)
              <br />
              <input
                type="url"
                value={dados.poster}
                onChange={(e) => atualizar("poster", e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Status
              <br />
              <select
                value={dados.status}
                onChange={(e) => atualizar("status", e.target.value)}
              >
                <option value="assistido">Assistido</option>
                <option value="assistindo">Assistindo</option>
                <option value="quero">Quero assistir</option>
              </select>
            </label>
          </p>
          <p>
            <label>
              Nota (1 a 5)
              <br />
              <select
                value={dados.nota}
                onChange={(e) => atualizar("nota", e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
          </p>
          <p>
            <label>
              Comentário (opcional)
              <br />
              <textarea
                value={dados.comentario}
                onChange={(e) => atualizar("comentario", e.target.value)}
              />
            </label>
          </p>
          <p>
            <button type="button" onClick={aoFechar}>
              Cancelar
            </button>
            <button type="submit">Salvar</button>
          </p>
        </form>
      </div>
    </div>
  );
}
