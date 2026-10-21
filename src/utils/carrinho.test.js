import {
  adicionarJogo,
  aumentarQuantidade,
  diminuirQuantidade,
  removerJogo,
  contarItens,
  calcularSubtotal,
} from "./carrinho";

const neon = { id: 1, nome: "Neon Drift", preco: 249.9, estoque: 12 };
const pixel = { id: 4, nome: "Pixel Kingdom", preco: 149.9, estoque: 2 };
const storm = { id: 6, nome: "Storm Legion", preco: 89.9, estoque: 0 };

describe("adicionarJogo", () => {
  test("coloca o jogo no carrinho vazio com quantidade 1", () => {
    const carrinho = adicionarJogo([], neon);

    expect(carrinho).toHaveLength(1);
    expect(carrinho[0].quantidade).toBe(1);
  });

  test("não duplica a linha: soma na quantidade", () => {
    const carrinho = adicionarJogo(adicionarJogo([], neon), neon);

    expect(carrinho).toHaveLength(1);
    expect(carrinho[0].quantidade).toBe(2);
  });

  test("não adiciona jogo esgotado", () => {
    expect(adicionarJogo([], storm)).toEqual([]);
  });
});

describe("limite por jogo", () => {
  test("para em 3 unidades mesmo com estoque sobrando", () => {
    const carrinho = aumentarQuantidade([{ ...neon, quantidade: 3 }], 1);
    expect(carrinho[0].quantidade).toBe(3);
  });

  test("para no estoque quando ele é menor que 3", () => {
    const carrinho = aumentarQuantidade([{ ...pixel, quantidade: 2 }], 4);
    expect(carrinho[0].quantidade).toBe(2);
  });
});

describe("diminuir e remover", () => {
  test("ao chegar em zero, o jogo sai do carrinho", () => {
    expect(diminuirQuantidade([{ ...neon, quantidade: 1 }], 1)).toHaveLength(0);
  });

  test("remove o jogo pelo id", () => {
    const carrinho = [{ ...neon, quantidade: 2 }, { ...pixel, quantidade: 1 }];
    expect(removerJogo(carrinho, 1)).toEqual([{ ...pixel, quantidade: 1 }]);
  });
});

describe("contas do carrinho", () => {
  const carrinho = [{ ...neon, quantidade: 2 }, { ...pixel, quantidade: 1 }];

  test("conta as unidades, não as linhas", () => {
    expect(contarItens(carrinho)).toBe(3);
  });

  test("calcula o subtotal com duas casas", () => {
    expect(calcularSubtotal(carrinho)).toBe(649.7);
  });
});
