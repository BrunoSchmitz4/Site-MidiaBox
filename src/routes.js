import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Produto from "./pages/Produto";
import Carrinho from "./pages/Carrinho";
import Checkout from "./pages/Checkout";
import Pedidos from "./pages/Pedidos";
import NotFound from "./pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Catalogo" element={<Catalogo />} />
      <Route path="/Catalogo/:id" element={<Produto />} />
      <Route path="/Carrinho" element={<Carrinho />} />
      <Route path="/Checkout" element={<Checkout />} />
      <Route path="/Pedidos" element={<Pedidos />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
