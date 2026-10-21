import { nomeValido, emailValido, cepValido, validarCheckout } from "./validacao";

describe("validações do checkout", () => {
  test("exige nome e sobrenome", () => {
    expect(nomeValido("Ana Souza")).toBe(true);
    expect(nomeValido("Ana")).toBe(false);
  });

  test("valida formato de e-mail", () => {
    expect(emailValido("aluno@escola.com")).toBe(true);
    expect(emailValido("aluno@escola")).toBe(false);
  });

  test("aceita CEP com ou sem hífen", () => {
    expect(cepValido("17700-000")).toBe(true);
    expect(cepValido("17700000")).toBe(true);
    expect(cepValido("1770")).toBe(false);
  });

  test("retorna um erro para cada campo inválido", () => {
    const erros = validarCheckout({ nome: "", email: "x", cep: "1", endereco: "" });
    expect(Object.keys(erros)).toEqual(["nome", "email", "cep", "endereco"]);
  });
});
