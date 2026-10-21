import { Link } from "react-router";
import Card from "../Card";

function Vitrine({ jogos }) {
  return (
    <div className="grade">
      {jogos.map((jogo) => (
        <Link key={jogo.id} to={`/Catalogo/${jogo.id}`}>
          <Card {...jogo} />
        </Link>
      ))}
    </div>
  );
}

export default Vitrine;
