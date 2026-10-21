import { useLocation } from "react-router";
import style from "./Pedidos.module.css";
import { useCarrinho } from "../../context/CarrinhoContext";
import { formatarPreco } from "../../utils/formatarPreco";

export default function Pedidos() {
  const { pedidos } = useCarrinho();
  const novo = useLocation().state?.novo;

  if (pedidos.length === 0) return <section>Você não tem pedidos ainda. Peça um!</section>;

  return (
    <section>
      {novo && <p className="caixa sucesso" role="status">Pedido #{novo} confirmado!</p>}
      <h1>Seus Pedidos</h1>

      {pedidos.map((pedido) => (
        <div key={pedido.id} className={`${style.pedido} caixa`} data-testid="pedido">
          <div className="linha">
            <strong>Pedido #{pedido.id} · {pedido.data}</strong>
            <span>
              {formatarPreco(pedido.resumo.total)} via {pedido.pagamento === "pix" ? "Pix" : `cartão em ${pedido.parcelas}x`}
            </span>
          </div>
          <ul className={style.lista}>
            {pedido.itens.map((item) => (
              <li key={item.id}>
                {item.nome} ({item.plataforma}) · {item.quantidade}x · {formatarPreco(item.preco * item.quantidade)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
