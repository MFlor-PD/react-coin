import { BrowserRouter, Routes, Route } from "react-router-dom";
import Root from "../Root";
import Home from "../Home";
import Favorites from "../Favorites";
import CoinId from "../CoinId";
import './styles/components.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="coin/:slug" element={<CoinId />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
