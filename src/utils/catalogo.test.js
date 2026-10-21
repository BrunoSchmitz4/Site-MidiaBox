import { filtrarJogos, rotuloEstoque } from "./catalogo";
import { jogos } from "../data/jogos";

describe("filtrarJogos", () => {
  test("filtra por plataforma", () => {
    const lista = filtrarJogos(jogos, { plataforma: "Switch" });
    expect(lista.every((jogo) => jogo.plataforma === "Switch")).toBe(true);
  });

  test("busca pelo nome sem diferenciar maiúsculas", () => {
    expect(filtrarJogos(jogos, { busca: "NEON" }).map((jogo) => jogo.id)).toEqual([1]);
  });

  test("ordena pelo menor preço", () => {
    const precos = filtrarJogos(jogos, { ordem: "menor-preco" }).map((jogo) => jogo.preco);
    expect(precos).toEqual([...precos].sort((a, b) => a - b));
  });
});

describe("rotuloEstoque", () => {
  test("mostra a situação do estoque", () => {
    expect(rotuloEstoque(0)).toBe("Esgotado");
    expect(rotuloEstoque(2)).toBe("Últimas 2 unidades");
    expect(rotuloEstoque(10)).toBe("Em estoque");
  });
});
