import { useParams } from "react-router";
import styles from "./Produto.module.css";
import Capa from "../../components/Capa";
import { jogos } from "../../data/jogos";
import { useCarrinho } from "../../context/CarrinhoContext";
import { formatarPreco } from "../../utils/formatarPreco";
import { limiteDoJogo } from "../../utils/carrinho";
import { rotuloEstoque } from "../../utils/catalogo";

function Produto() {
  const { adicionarItem, quantidadeDe } = useCarrinho();
  const { id } = useParams();

  const jogo = jogos.find((j) => j.id === Number(id));

  if (!jogo) {
    return <section>Opa! Esse jogo parece inexistente ou foi removido.</section>;
  }

  const noCarrinho = quantidadeDe(jogo.id);
  const atingiuLimite = jogo.estoque > 0 && noCarrinho >= limiteDoJogo(jogo);

  return (
    <section>
      <div className={`${styles.produto} caixa`}>
        <Capa nome={jogo.nome} plataforma={jogo.plataforma} cores={jogo.cores} grande />
        <div className={styles.info}>
          <h1>{jogo.nome}</h1>
          <p className="suave">{jogo.plataforma} · {jogo.genero} · Mídia física</p>
          <p className={styles.preco}>{formatarPreco(jogo.preco)}</p>
          <p className={jogo.estoque === 0 ? "perigo" : "sucesso"}>{rotuloEstoque(jogo.estoque)}</p>

          {jogo.estoque === 0 && <p className="perigo">Jogo indisponível</p>}
          {jogo.estoque > 0 && !atingiuLimite && (
            <button onClick={() => adicionarItem(jogo)}>Adicionar ao Carrinho</button>
          )}
          {atingiuLimite && <p className="perigo">Você já tem o máximo permitido deste jogo no carrinho.</p>}
          {noCarrinho > 0 && <p className="suave" role="status">No carrinho: {noCarrinho}</p>}
        </div>
      </div>
    </section>
  );
}

export default Produto;
