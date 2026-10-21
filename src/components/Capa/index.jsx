import styles from "./Capa.module.css";

function Capa({ nome, plataforma, cores = ["#38bdf8", "#1e3a8a"], grande }) {
  return (
    <div
      className={`${styles.capa} ${grande ? styles.grande : ""}`}
      style={{ background: `linear-gradient(145deg, ${cores[0]}, ${cores[1]})` }}
      aria-hidden="true"
    >
      <small>{plataforma}</small>
      <span>{nome}</span>
    </div>
  );
}

export default Capa;
