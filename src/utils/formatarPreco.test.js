import { formatarPreco } from "./formatarPreco";

describe("formatarPreco", () => {
  test("formata um valor comum no padrão brasileiro", () => {
    expect(formatarPreco(249.9)).toBe("R$ 249,90");
  });

  test("sempre mostra duas casas decimais", () => {
    expect(formatarPreco(25)).toBe("R$ 25,00");
  });

  test("não quebra quando o preço não é número", () => {
    expect(formatarPreco(undefined)).toBe("R$ 0,00");
    expect(formatarPreco("banana")).toBe("R$ 0,00");
  });
});
