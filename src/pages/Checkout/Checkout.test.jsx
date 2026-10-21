import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderAppCompleto, salvarCarrinho } from "../../testes/utilsDeTeste";

const deep = { id: 5, nome: "Deep Current", plataforma: "PS5", preco: 349.9, estoque: 4, quantidade: 1 };

async function preencher(usuario) {
  await usuario.type(screen.getByLabelText("Nome completo"), "Ana Souza");
  await usuario.type(screen.getByLabelText("E-mail"), "ana@email.com");
  await usuario.type(screen.getByLabelText("CEP"), "17700-000");
  await usuario.type(screen.getByLabelText("Endereço"), "Rua das Flores, 10");
}

beforeEach(() => {
  localStorage.clear();
});

describe("página Checkout", () => {
  test("com o carrinho vazio volta para o Carrinho", () => {
    renderAppCompleto("/Checkout");

    expect(screen.getByText("Seu carrinho está vazio.")).toBeInTheDocument();
  });

  test("mostra os erros de validação", async () => {
    const usuario = userEvent.setup();
    salvarCarrinho([deep]);
    renderAppCompleto("/Checkout");

    await usuario.click(screen.getByRole("button", { name: "Confirmar Pedido" }));

    expect(screen.getByText("Informe nome e sobrenome")).toBeInTheDocument();
    expect(screen.getByText("O CEP deve ter 8 dígitos")).toBeInTheDocument();
  });

  test("no cartão oferece as parcelas conforme o total", async () => {
    const usuario = userEvent.setup();
    salvarCarrinho([deep]);
    renderAppCompleto("/Checkout");

    await usuario.click(screen.getByLabelText("Cartão de crédito"));

    expect(screen.getByLabelText("Parcelas").querySelectorAll("option")).toHaveLength(6);
  });

  test("confirma o pedido, esvazia o carrinho e abre Pedidos", async () => {
    const usuario = userEvent.setup();
    salvarCarrinho([deep]);
    renderAppCompleto("/Checkout");

    await preencher(usuario);
    await usuario.click(screen.getByRole("button", { name: "Confirmar Pedido" }));

    expect(screen.getByRole("status")).toHaveTextContent(/Pedido #\d+ confirmado!/);
    expect(screen.getByText("Carrinho (0)")).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("pedidos"))).toHaveLength(1);
  });
});
