import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function CoinId() {
  const { slug } = useParams();
  const [coin, setCoin] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoin() {
      try {
        setLoading(true);
        const res = await fetch(`https://rest.coincap.io/v3/assets/${slug}`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            Accept: 'application/json',
          },
        });
        if (!res.ok) throw new Error('Error al cargar los datos de la criptomoneda');
        const data = await res.json();
        setCoin(data.data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCoin();
  }, [slug]);

  if (loading) {
    return (
      <div className="loading-state">
        <h2>⚡ Cargando detalles...</h2>
        <p>Obteniendo información detallada de la criptomoneda</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h1>❌ Error</h1>
        <p>{error}</p>
        <Link to="/" className="details-link">
          🏠 Volver al inicio
        </Link>
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="empty-state">
        <h2>❓ Criptomoneda no encontrada</h2>
        <p>No se pudo encontrar la información de esta criptomoneda</p>
        <Link to="/" className="details-link">
          🏠 Volver al inicio
        </Link>
      </div>
    );
  }

  const formatNumber = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return parseFloat(num).toFixed(2);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
    }).format(value);
  };

  const priceChange = parseFloat(coin.changePercent24Hr);
  const isPositive = priceChange >= 0;

  return (
    <div className="coin-detail">
      <div className="coin-detail-header">
        <Link to="/" className="back-link">
          ← Volver
        </Link>
        <h1 className="page-title">
          #{coin.rank} {coin.name} 
          <span className="coin-symbol">({coin.symbol})</span>
        </h1>
      </div>

      <div className="coin-detail-grid">
        <div className="detail-card price-card">
          <h3>💰 Precio Actual</h3>
          <div className="detail-price">
            {formatCurrency(coin.priceUsd)}
          </div>
          <div className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '📈' : '📉'} {priceChange.toFixed(2)}% (24h)
          </div>
        </div>

        <div className="detail-card">
          <h3>📊 Capitalización de Mercado</h3>
          <div className="detail-value">
            ${formatNumber(coin.marketCapUsd)}
          </div>
        </div>

        <div className="detail-card">
          <h3>💹 Volumen (24h)</h3>
          <div className="detail-value">
            ${formatNumber(coin.volumeUsd24Hr)}
          </div>
        </div>

        <div className="detail-card">
          <h3>🪙 Suministro Circulante</h3>
          <div className="detail-value">
            {formatNumber(coin.supply)} {coin.symbol}
          </div>
        </div>

        {coin.maxSupply && (
          <div className="detail-card">
            <h3>🔢 Suministro Máximo</h3>
            <div className="detail-value">
              {formatNumber(coin.maxSupply)} {coin.symbol}
            </div>
          </div>
        )}

        <div className="detail-card">
          <h3>⚖️ VWAP (24h)</h3>
          <div className="detail-value">
            {coin.vwap24Hr ? formatCurrency(coin.vwap24Hr) : 'N/A'}
          </div>
        </div>
      </div>

      <div className="coin-actions">
        <Link to="/" className="action-btn primary">
          🏠 Ver todas las criptomonedas
        </Link>
        <Link to="/favorites" className="action-btn secondary">
          ⭐ Ir a favoritos
        </Link>
      </div>
    </div>
  );
}

export default CoinId;