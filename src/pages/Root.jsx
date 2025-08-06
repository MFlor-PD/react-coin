import { Outlet, Link, useLocation } from "react-router-dom";

function Root() {
  const location = useLocation();

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">₿</span>
            <h1 className="logo-text">React Coin</h1>
          </div>
          
          <nav className="navigation">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              <span className="nav-icon">🏠</span>
              Home
            </Link>
            <Link 
              to="/favorites" 
              className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
            >
              <span className="nav-icon">⭐</span>
              Favoritos
            </Link>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 React Coin App - Seguimiento de Criptomonedas en Tiempo Real</p>
          <div className="footer-links">
            <a href="#" className="footer-link">API</a>
            <a href="#" className="footer-link">Documentación</a>
            <a href="#" className="footer-link">Soporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Root;

