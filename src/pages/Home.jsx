import { useState, useEffect } from "react";
import CardCripto from "../components/CardCripto";

function Home() {
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  useEffect(() => {
    async function fetchCryptos() {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div className="loading-state">
        <h2>⚡ Cargando criptomonedas...</h2>
        <p>Obteniendo los datos más recientes del mercado</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h1>❌ Error de Conexión</h1>
        <p>{error}</p>
        <p>Por favor, verifica tu conexión a internet e intenta nuevamente.</p>
      </div>
    );
  }

  return (
    <div className="home">
      <h1 className="page-title">🚀 Top 10 Criptomonedas</h1>
      <div className="crypto-container">
        {cryptos.map((coin) => (
          <CardCripto
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



