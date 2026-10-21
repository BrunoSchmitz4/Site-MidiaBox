import style from "./Card.module.css";
import Capa from "../Capa";
import { formatarPreco } from "../../utils/formatarPreco";
import { rotuloEstoque } from "../../utils/catalogo";

function Card({ nome, plataforma, genero, preco, estoque = 0, cores }) {
  return (
    <div className={`${style.card} caixa`}>
      <Capa nome={nome} plataforma={plataforma} cores={cores} />
      <h4 className={style.titulo}>{nome}</h4>
      <span className="suave">{plataforma} · {genero}</span>
      <strong>{formatarPreco(preco)}</strong>
      <small className={estoque === 0 ? "perigo" : "sucesso"}>{rotuloEstoque(estoque)}</small>
    </div>
  );
}

export default Card;
