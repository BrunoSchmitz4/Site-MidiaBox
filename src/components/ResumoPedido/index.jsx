import style from "./ResumoPedido.module.css";
import { formatarPreco } from "../../utils/formatarPreco";

function ResumoPedido({ resumo }) {
  const linhas = [
    { rotulo: "Subtotal", valor: formatarPreco(resumo.subtotal) },
    resumo.desconto > 0 && { rotulo: "Desconto do cupom", valor: `- ${formatarPreco(resumo.desconto)}` },
    { rotulo: "Frete", valor: resumo.frete === 0 ? "Grátis" : formatarPreco(resumo.frete) },
    resumo.descontoPix > 0 && { rotulo: "Desconto Pix", valor: `- ${formatarPreco(resumo.descontoPix)}` },
  ].filter(Boolean);

  return (
    <dl className={style.resumo} aria-label="Resumo do pedido">
      {linhas.map((linha) => (
        <div key={linha.rotulo} className="linha">
          <dt>{linha.rotulo}</dt>
          <dd>{linha.valor}</dd>
        </div>
      ))}
      <div className={`linha ${style.total}`}>
        <dt>Total</dt>
        <dd data-testid="total">{formatarPreco(resumo.total)}</dd>
      </div>
    </dl>
  );
}

export default ResumoPedido;
