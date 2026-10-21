import { Link } from "react-router";
import Vitrine from "../../components/Vitrine";
import { jogos } from "../../data/jogos";

function Home() {
  const destaques = jogos.filter((jogo) => jogo.estoque > 0).slice(0, 4);

  return (
    <section>
      <h1>Mídia física, do jeito que tem que ser</h1>
      <p className="suave">Frete grátis a partir de R$ 300,00.</p>
      <Link to="/Catalogo" className="botao">Ver catálogo</Link>

      <h2>Destaques</h2>
      <Vitrine jogos={destaques} />
    </section>
  );
}

export default Home;
