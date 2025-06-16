import { Outlet, Link } from "react-router-dom";

function Root() {
  return (
    <div>
      <nav style={{ padding: "10px", backgroundColor: "#eee" }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/favorites">Favorites</Link>
      </nav>

      <main style={{ padding: "20px" }}>
        {}
        <Outlet />
      </main>

      <footer style={{ padding: "10px", backgroundColor: "#eee", marginTop: "20px" }}>
        <p>© 2025 Mi App de Criptomonedas</p>
      </footer>
    </div>
  );
}

export default Root;

