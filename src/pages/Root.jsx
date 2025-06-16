import { Link } from "react-router-dom";

function Root() {
  return (
    <div className="root">
      <h1>Welcome to the Root Page</h1>
      <p>This is the root page of your Cripto application.</p>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Root;
