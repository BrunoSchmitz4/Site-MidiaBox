import { useState } from "react";
import styles from "./Catalogo.module.css";
import Vitrine from "../../components/Vitrine";
import { jogos, plataformas } from "../../data/jogos";
import { filtrarJogos } from "../../utils/catalogo";

function Catalogo() {
  const [filtros, setFiltros] = useState({ busca: "", plataforma: "todas", ordem: "relevancia" });
  const filtrados = filtrarJogos(jogos, filtros);

  function atualizar(e) {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  }

  return (
    <section>
      <h1>Catálogo</h1>

      <div className={styles.filtros}>
        <input name="busca" value={filtros.busca} onChange={atualizar} placeholder="Buscar jogo..." />
        <select name="plataforma" aria-label="Plataforma" value={filtros.plataforma} onChange={atualizar}>
          <option value="todas">Todas as plataformas</option>
          {plataformas.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <select name="ordem" aria-label="Ordenar" value={filtros.ordem} onChange={atualizar}>
          <option value="relevancia">Relevância</option>
          <option value="menor-preco">Menor preço</option>
          <option value="maior-preco">Maior preço</option>
          <option value="nome">Nome (A a Z)</option>
        </select>
      </div>

      {filtrados.length === 0 && <p className="suave">Nenhum jogo encontrado.</p>}
      <Vitrine jogos={filtrados} />
    </section>
  );
}

export default Catalogo;
