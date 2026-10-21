import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes";
import { CarrinhoProvider } from "./context/CarrinhoContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CarrinhoProvider>
        <Header />
        <AppRoutes />
        <Footer />
      </CarrinhoProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
