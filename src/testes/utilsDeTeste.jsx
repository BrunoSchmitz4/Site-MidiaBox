import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { CarrinhoProvider } from "../context/CarrinhoContext";
import Header from "../components/Header";
import AppRoutes from "../routes";

export function renderComApp(elemento, { caminho, rota = "/" } = {}) {
  return render(
    <MemoryRouter initialEntries={[rota]}>
      <CarrinhoProvider>
        <Header />
        <Routes>
          <Route path={caminho} element={elemento} />
        </Routes>
      </CarrinhoProvider>
    </MemoryRouter>,
  );
}

export function renderAppCompleto(rota = "/") {
  return render(
    <MemoryRouter initialEntries={[rota]}>
      <CarrinhoProvider>
        <Header />
        <AppRoutes />
      </CarrinhoProvider>
    </MemoryRouter>,
  );
}

export function salvarCarrinho(itens) {
  localStorage.setItem("carrinho", JSON.stringify(itens));
}
