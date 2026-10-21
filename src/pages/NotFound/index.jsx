import { Link } from "react-router";

function NotFound() {
  return (
    <section>
      <h2>Opa! Página não encontrada.</h2>
      <p className="suave">Esse jogo saiu de catálogo.</p>
      <Link to="/">Voltar para a Home</Link>
    </section>
  );
}

export default NotFound;
