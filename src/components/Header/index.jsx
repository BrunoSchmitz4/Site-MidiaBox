import { NavLink } from "react-router";
import styles from "./Header.module.css";
import { useCarrinho } from "../../context/CarrinhoContext";

export default function Header() {
  const { totalItens } = useCarrinho();
  const classeLink = ({ isActive }) => (isActive ? `${styles.link} ${styles.ativo}` : styles.link);

  return (
    <header className={styles.header}>
      <h2>MídiaBox</h2>
      <nav className={styles.nav}>
        <NavLink className={classeLink} to="/" end>Home</NavLink>
        <NavLink className={classeLink} to="/Catalogo">Catálogo</NavLink>
        <NavLink className={classeLink} to="/Carrinho">Carrinho ({totalItens()})</NavLink>
        <NavLink className={classeLink} to="/Pedidos">Pedidos</NavLink>
      </nav>
    </header>
  );
}
