import { useState } from "react";
import { Navigate } from "react-router";
import styles from "./Checkout.module.css";
import ResumoPedido from "../../components/ResumoPedido";
import { useCarrinho } from "../../context/CarrinhoContext";
import { formatarPreco } from "../../utils/formatarPreco";
import { opcoesDeParcelas } from "../../utils/pagamento";
import { validarCheckout } from "../../utils/validacao";

const campos = [
  { nome: "nome", rotulo: "Nome completo" },
  { nome: "email", rotulo: "E-mail", tipo: "email" },
  { nome: "cep", rotulo: "CEP" },
  { nome: "endereco", rotulo: "Endereço" },
];

export default function Checkout() {
  const { itens, resumo, finalizarCompra } = useCarrinho();
  const [form, setForm] = useState({ nome: "", email: "", cep: "", endereco: "", pagamento: "pix", parcelas: 1 });
  const [erros, setErros] = useState({});
  const [pedidoId, setPedidoId] = useState(null);

  if (pedidoId) return <Navigate to="/Pedidos" state={{ novo: pedidoId }} replace />;
  if (itens.length === 0) return <Navigate to="/Carrinho" replace />;

  const resumoAtual = resumo(form.pagamento);

  function atualizar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function confirmar(e) {
    e.preventDefault();
    const encontrados = validarCheckout(form);
    setErros(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    const { pagamento, parcelas, ...cliente } = form;
    const pedido = finalizarCompra({ cliente, pagamento, parcelas: pagamento === "cartao" ? Number(parcelas) : 1 });
    setPedidoId(pedido.id);
  }

  return (
    <section>
      <form className="duas-colunas" onSubmit={confirmar} noValidate>
        <div className="caixa">
          <h1>Checkout</h1>
          {campos.map((campo) => (
            <label key={campo.nome} className={styles.campo}>
              {campo.rotulo}
              <input name={campo.nome} type={campo.tipo || "text"} value={form[campo.nome]} onChange={atualizar} />
              {erros[campo.nome] && <small className="perigo">{erros[campo.nome]}</small>}
            </label>
          ))}

          <fieldset className={styles.campo}>
            <legend>Pagamento</legend>
            <label><input type="radio" name="pagamento" value="pix" checked={form.pagamento === "pix"} onChange={atualizar} /> Pix (5% de desconto)</label>
            <label><input type="radio" name="pagamento" value="cartao" checked={form.pagamento === "cartao"} onChange={atualizar} /> Cartão de crédito</label>
          </fieldset>

          {form.pagamento === "cartao" && (
            <label className={styles.campo}>
              Parcelas
              <select name="parcelas" value={form.parcelas} onChange={atualizar}>
                {opcoesDeParcelas(resumoAtual.total).map((opcao) => (
                  <option key={opcao.vezes} value={opcao.vezes}>{opcao.vezes}x de {formatarPreco(opcao.valor)} sem juros</option>
                ))}
              </select>
            </label>
          )}
        </div>

        <aside className="caixa">
          <ResumoPedido resumo={resumoAtual} />
          <button className="largo">Confirmar Pedido</button>
        </aside>
      </form>
    </section>
  );
}
