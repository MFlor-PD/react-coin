import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Componente separado para la card de criptomoneda
function CardCrypto({ id, rank, name, priceUsd, isFavorite, onToggleFavorite }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        maxWidth: "300px",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ margin: "0 0 10px" }}>
        {rank}. {name}
      </h2>
      <p style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>
        ${parseFloat(priceUsd).toFixed(2)}
      </p>
      <button onClick={() => onToggleFavorite(id)} style={{ marginTop: "10px" }}>
        {isFavorite ? "🪙 Quitar de favoritos" : "🪙 Añadir a favoritos"}
      </button>
      <Link
        to={`/coin/${id}`}
        style={{ display: "block", marginTop: "10px", textDecoration: "underline", color: "blue" }}
      >
        Ver detalles
      </Link>
    </div>
  );
}

function Home() {
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  useEffect(() => {
    async function fetchCryptos() {
      try {
        const response = await fetch(`https://rest.coincap.io/v3/assets?limit=10`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            Accept: "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCryptos(data.data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchCryptos();
  }, []);

  function toggleFavorite(id) {
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((favId) => favId !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }

  if (error) {
    return (
      <div className="error">
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="home">
      <h1>Top 10 Criptomonedas</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {cryptos.map((coin) => (
          <CardCrypto
            key={coin.id}
            id={coin.id}
            rank={coin.rank}
            name={coin.name}
            priceUsd={coin.priceUsd}
            isFavorite={favorites.includes(coin.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;



