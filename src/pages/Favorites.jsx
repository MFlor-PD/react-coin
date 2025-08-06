import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        setLoading(true);
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (storedFavorites.length === 0) {
          setFavorites([]);
          setLoading(false);
          return;
        }

        const response = await fetch(`https://rest.coincap.io/v3/assets?limit=100`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al cargar las criptomonedas");
        }

        const data = await response.json();

        const filteredFavorites = data.data.filter((coin) => storedFavorites.includes(coin.id));

        setFavorites(filteredFavorites);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, []);

  function handleRemoveFavorite(id) {
    // Leer el arreglo actual de favoritos en localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    // Filtrar para eliminar el id indicado
    const updatedFavorites = storedFavorites.filter(favId => favId !== id);
    // Guardar la lista actualizada
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    // Actualizar el estado para re-renderizar la lista sin la cripto eliminada
    setFavorites(prev => prev.filter(coin => coin.id !== id));
  }

  function FavoriteCard({ coin, onRemove }) {
    return (
      <div className="card-cripto">
        <div className="card-header">
          <h2>
            {coin.rank}. {coin.name}
          </h2>
          <button
            onClick={(e) => {
              e.preventDefault();
              onRemove(coin.id);
            }}
            className="remove-fav-btn"
            aria-label={`Eliminar ${coin.name} de favoritos`}
          >
            ✕
          </button>
        </div>
        <p className="price">${parseFloat(coin.priceUsd).toFixed(2)}</p>
        <Link className="details-link" to={`/coin/${coin.id}`}>
          Ver detalles
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-state">
        <h2>⭐ Cargando favoritos...</h2>
        <p>Obteniendo tus criptomonedas favoritas</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error">
        <h1>❌ Error</h1>
        <p>{error}</p>
        <p>No se pudieron cargar tus favoritos. Intenta nuevamente.</p>
      </div>
    );
  }
  
  if (favorites.length === 0) {
    return (
      <div className="empty-state">
        <h2>💫 No hay favoritos aún</h2>
        <p>Ve a la página principal y agrega algunas criptomonedas a tus favoritos</p>
        <Link to="/" className="details-link">
          🏠 Ir al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h1 className="page-title">⭐ Mis Favoritos</h1>
      <div className="crypto-container">
        {favorites.map((coin) => (
          <FavoriteCard
            key={coin.id}
            coin={coin}
            onRemove={handleRemoveFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;



