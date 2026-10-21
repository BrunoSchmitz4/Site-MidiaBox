import { useState } from "react";
import { Link } from "react-router";
import styles from "./Carrinho.module.css";
import ResumoPedido from "../../components/ResumoPedido";
import { useCarrinho } from "../../context/CarrinhoContext";
import { formatarPreco } from "../../utils/formatarPreco";
import { limiteDoJogo } from "../../utils/carrinho";

export default function Carrinho() {
  const { itens, cupom, removerItem, aumentarQuantidade, diminuirQuantidade, aplicarCupom, resumo } = useCarrinho();
  const [codigo, setCodigo] = useState(cupom);
  const [mensagem, setMensagem] = useState("");

  if (itens.length === 0) {
    return (
      <section>
        <p>Seu carrinho está vazio.</p>
        <Link to="/Catalogo">Ver catálogo</Link>
      </section>
    );
  }

  function enviarCupom(e) {
    e.preventDefault();
    setMensagem(aplicarCupom(codigo) ? "Cupom aplicado" : "Cupom inválido");
  }

  return (
    <section className="duas-colunas">
      <div className="caixa">
        <h1>Seu Carrinho</h1>
        {itens.map((item) => (
          <div key={item.id} className={`linha ${styles.item}`}>
            <div>
              <strong>{item.nome}</strong>
              <div className="suave">{item.plataforma} · {formatarPreco(item.preco * item.quantidade)}</div>
            </div>

            <div className="linha">
              <button aria-label={`Diminuir ${item.nome}`} onClick={() => diminuirQuantidade(item.id)}>-</button>
              <span>{item.quantidade}</span>
              <button
                aria-label={`Aumentar ${item.nome}`}
                disabled={item.quantidade >= limiteDoJogo(item)}
                onClick={() => aumentarQuantidade(item.id)}
              >
                +
              </button>
            </div>

            <button className="secundario" onClick={() => removerItem(item.id)}>Remover</button>
          </div>
        ))}
      </div>

      <aside className="caixa">
        <form className={styles.cupom} onSubmit={enviarCupom}>
          <input aria-label="Cupom" placeholder="Cupom de desconto" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
          <button className="secundario">Aplicar</button>
        </form>
        {mensagem && <p className={mensagem === "Cupom aplicado" ? "sucesso" : "perigo"} role="status">{mensagem}</p>}

        <ResumoPedido resumo={resumo()} />
        <Link to="/Checkout" className="botao largo">Finalizar Compra</Link>
      </aside>
    </section>
  );
}
