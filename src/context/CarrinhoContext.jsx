import { createContext, useContext, useEffect, useState } from "react";
import * as regras from "../utils/carrinho";
import { buscarCupom, calcularResumo } from "../utils/pagamento";

const CarrinhoContext = createContext();

function lerSalvo(chave) {
  return JSON.parse(localStorage.getItem(chave) || "[]");
}

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState(() => lerSalvo("carrinho"));
  const [pedidos, setPedidos] = useState(() => lerSalvo("pedidos"));
  const [cupom, setCupom] = useState("");

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(itens));
  }, [itens]);

  useEffect(() => {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
  }, [pedidos]);

  function adicionarItem(jogo) {
    setItens((prev) => regras.adicionarJogo(prev, jogo));
  }

  function removerItem(id) {
    setItens((prev) => regras.removerJogo(prev, id));
  }

  function aumentarQuantidade(id) {
    setItens((prev) => regras.aumentarQuantidade(prev, id));
  }

  function diminuirQuantidade(id) {
    setItens((prev) => regras.diminuirQuantidade(prev, id));
  }

  function totalItens() {
    return regras.contarItens(itens);
  }

  function quantidadeDe(id) {
    return regras.quantidadeNoCarrinho(itens, id);
  }

  function aplicarCupom(codigo) {
    const valido = Boolean(buscarCupom(codigo));
    setCupom(valido ? codigo.trim().toUpperCase() : "");
    return valido;
  }

  function resumo(pagamento) {
    return calcularResumo(itens, cupom, pagamento);
  }

  function finalizarCompra({ cliente, pagamento, parcelas }) {
    if (itens.length === 0) return null;

    const novoPedido = {
      id: Date.now(),
      data: new Date().toLocaleDateString("pt-BR"),
      itens,
      cliente,
      pagamento,
      parcelas,
      resumo: resumo(pagamento),
    };

    setPedidos((prev) => [novoPedido, ...prev]);
    setItens([]);
    setCupom("");
    return novoPedido;
  }

  return (
    <CarrinhoContext.Provider
      value={{ itens, pedidos, cupom, adicionarItem, removerItem, aumentarQuantidade, diminuirQuantidade, totalItens, quantidadeDe, aplicarCupom, resumo, finalizarCompra }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}
