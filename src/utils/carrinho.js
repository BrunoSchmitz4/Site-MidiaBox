export const LIMITE_POR_JOGO = 3;

export function limiteDoJogo(jogo) {
  return Math.min(jogo.estoque, LIMITE_POR_JOGO);
}

export function adicionarJogo(itens, jogo) {
  const jaExiste = itens.find((item) => item.id === jogo.id);

  if (jaExiste) return aumentarQuantidade(itens, jogo.id);
  if (jogo.estoque <= 0) return itens;

  return [...itens, { ...jogo, quantidade: 1 }];
}

export function aumentarQuantidade(itens, id) {
  return itens.map((item) =>
    item.id === id && item.quantidade < limiteDoJogo(item)
      ? { ...item, quantidade: item.quantidade + 1 }
      : item,
  );
}

export function diminuirQuantidade(itens, id) {
  return itens
    .map((item) =>
      item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item,
    )
    .filter((item) => item.quantidade > 0);
}

export function removerJogo(itens, id) {
  return itens.filter((item) => item.id !== id);
}

export function quantidadeNoCarrinho(itens, id) {
  return itens.find((item) => item.id === id)?.quantidade || 0;
}

export function contarItens(itens) {
  return itens.reduce((total, item) => total + item.quantidade, 0);
}

export function calcularSubtotal(itens) {
  const soma = itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
  return Math.round(soma * 100) / 100;
}
