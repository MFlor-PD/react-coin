import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFavorites() {
      try {
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
        setLoading(false);
      } catch (err) {
        setError(err.message);
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

  function CardCrypto({ rank, name, priceUsd, onRemove }) {
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
          position: "relative",
        }}
      >
        <h2 style={{ margin: "0 0 10px" }}>
          {rank}. {name}
        </h2>
        <p style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>
          ${parseFloat(priceUsd).toFixed(2)}
        </p>
        <button
          onClick={onRemove}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "#e74c3c",
            border: "none",
            color: "white",
            borderRadius: "4px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
          aria-label={`Eliminar ${name} de favoritos`}
        >
          Eliminar
        </button>
      </div>
    );
  }

  if (loading) return <p>Cargando favoritos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (favorites.length === 0) return <p>No hay criptomonedas favoritas.</p>;

  return (
    <div>
      <h1>Criptomonedas Favoritas</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {favorites.map((coin) => (
          <Link
            key={coin.id}
            to={`/coin/${coin.id}`}
            style={{ textDecoration: "none", color: "inherit", flex: "1 0 300px", position: "relative" }}
          >
            <CardCrypto
              rank={coin.rank}
              name={coin.name}
              priceUsd={coin.priceUsd}
              onRemove={(e) => {
                e.preventDefault(); // para evitar que el link se active al clicar el botón
                handleRemoveFavorite(coin.id);
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Favorites;



