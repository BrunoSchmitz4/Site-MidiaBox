import { buscarCupom, calcularFrete, calcularResumo, opcoesDeParcelas } from "./pagamento";

const item = (preco, quantidade) => ({ preco, quantidade });

describe("frete", () => {
  test.each([
    [299.99, 25],
    [300, 0],
    [0, 0],
  ])("subtotal %p gera frete %p", (subtotal, esperado) => {
    expect(calcularFrete(subtotal, null)).toBe(esperado);
  });

  test("cupom FRETEGRATIS zera o frete", () => {
    expect(calcularFrete(59.9, buscarCupom("FRETEGRATIS"))).toBe(0);
  });
});

describe("cupom", () => {
  test("não diferencia maiúsculas e ignora espaços", () => {
    expect(buscarCupom(" aero10 ")).toEqual({ tipo: "percentual", valor: 0.1 });
  });

  test("cupom inexistente retorna null", () => {
    expect(buscarCupom("BLACKFRIDAY")).toBeNull();
  });
});

describe("calcularResumo", () => {
  test("aplica cupom de 10% e desconto do Pix sobre o total", () => {
    expect(calcularResumo([item(249.9, 2)], "AERO10", "pix")).toEqual({
      subtotal: 499.8,
      desconto: 49.98,
      frete: 0,
      descontoPix: 22.49,
      total: 427.33,
    });
  });

  test("no cartão não tem desconto Pix", () => {
    expect(calcularResumo([item(59.9, 1)], "", "cartao").total).toBe(84.9);
  });
});

describe("parcelas", () => {
  test("parcela mínima de R$ 50 e no máximo 10x", () => {
    expect(opcoesDeParcelas(120)).toHaveLength(2);
    expect(opcoesDeParcelas(40)).toHaveLength(1);
    expect(opcoesDeParcelas(2000)).toHaveLength(10);
  });
});
