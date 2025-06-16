import { Link } from "react-router-dom";
import "./CardCripto.css";

function CardCripto({ id, rank, name, priceUsd, isFavorite, onToggleFavorite }) {
  return (
    <div className="card-cripto">
      <h2>
        {rank}. {name}
      </h2>
      <p className="price">${parseFloat(priceUsd).toFixed(2)}</p>
      <button className="fav-btn" onClick={() => onToggleFavorite(id)}>
        {isFavorite ? "🪙 Quitar de favoritos" : "🪙 Añadir a favoritos"}
      </button>
      <Link className="details-link" to={`/coin/${id}`}>
        Ver detalles
      </Link>
    </div>
  );
}

export default CardCripto;

