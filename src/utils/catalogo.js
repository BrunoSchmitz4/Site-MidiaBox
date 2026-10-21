const ordenacoes = {
  relevancia: () => 0,
  "menor-preco": (a, b) => a.preco - b.preco,
  "maior-preco": (a, b) => b.preco - a.preco,
  nome: (a, b) => a.nome.localeCompare(b.nome),
};

export function filtrarJogos(lista, { busca = "", plataforma = "todas", ordem = "relevancia" } = {}) {
  const termo = busca.trim().toLowerCase();

  return lista
    .filter((jogo) => plataforma === "todas" || jogo.plataforma === plataforma)
    .filter((jogo) => jogo.nome.toLowerCase().includes(termo))
    .sort(ordenacoes[ordem] || ordenacoes.relevancia);
}

export function rotuloEstoque(estoque) {
  if (estoque === 0) return "Esgotado";
  if (estoque <= 3) return `Últimas ${estoque} unidades`;
  return "Em estoque";
}
