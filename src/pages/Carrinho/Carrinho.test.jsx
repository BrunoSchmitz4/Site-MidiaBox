import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Carrinho from "./index";
import { renderComApp, salvarCarrinho } from "../../testes/utilsDeTeste";

const bubble = { id: 8, nome: "Bubble Racers", plataforma: "PS4", preco: 59.9, estoque: 20, quantidade: 1 };
const abrir = () => renderComApp(<Carrinho />, { caminho: "/Carrinho", rota: "/Carrinho" });

beforeEach(() => {
  localStorage.clear();
});

describe("página Carrinho", () => {
  test("cobra frete abaixo de R$ 300", () => {
    salvarCarrinho([bubble]);
    abrir();

    expect(screen.getByTestId("total")).toHaveTextContent("R$ 84,90");
  });

  test("aplica o cupom AERO10", async () => {
    const usuario = userEvent.setup();
    salvarCarrinho([bubble]);
    abrir();

    await usuario.type(screen.getByLabelText("Cupom"), "aero10");
    await usuario.click(screen.getByRole("button", { name: "Aplicar" }));

    expect(screen.getByRole("status")).toHaveTextContent("Cupom aplicado");
    expect(screen.getByTestId("total")).toHaveTextContent("R$ 78,91");
  });

  test("avisa quando o cupom não existe", async () => {
    const usuario = userEvent.setup();
    salvarCarrinho([bubble]);
    abrir();

    await usuario.type(screen.getByLabelText("Cupom"), "BLACKFRIDAY");
    await usuario.click(screen.getByRole("button", { name: "Aplicar" }));

    expect(screen.getByRole("status")).toHaveTextContent("Cupom inválido");
  });

  test("o botão + trava no limite de 3 unidades", async () => {
    const usuario = userEvent.setup();
    salvarCarrinho([bubble]);
    abrir();

    await usuario.click(screen.getByRole("button", { name: "Aumentar Bubble Racers" }));
    await usuario.click(screen.getByRole("button", { name: "Aumentar Bubble Racers" }));

    expect(screen.getByText("Carrinho (3)")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Aumentar Bubble Racers" })).toBeDisabled();
  });

  test("diminuir até zero esvazia o carrinho", async () => {
    const usuario = userEvent.setup();
    salvarCarrinho([bubble]);
    abrir();

    await usuario.click(screen.getByRole("button", { name: "Diminuir Bubble Racers" }));

    expect(screen.getByText("Seu carrinho está vazio.")).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("carrinho"))).toEqual([]);
  });
});
