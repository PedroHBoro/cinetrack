function estrelas(nota) {
  return "★".repeat(nota) + "☆".repeat(5 - nota);
}

const ROTULOS = {
  assistido: "Assistido",
  assistindo: "Assistindo",
  quero: "Quero assistir",
};

export default function CardFilme({ filme }) {
  return (
    <article className="card">
      <img src={filme.poster} alt={filme.titulo} />
      <div className="card-info">
        <h2 className="titulo">{filme.titulo}</h2>
        <div className="card-inner">
          <div>
            <span className="ano">{filme.ano}</span>
            {" • "}
            <span className="genero">{filme.genero}</span>
          </div>
          <p className="nota">Nota: {estrelas(filme.nota)}</p>
          <span className="status">{ROTULOS[filme.status]}</span>
        </div>
        <div className="card-actions">
          <button className="btn-editar">Editar</button>
          <button className="btn-remover">Remover</button>
        </div>
      </div>
    </article>
  );
}
