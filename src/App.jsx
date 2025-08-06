import { BrowserRouter, Routes, Route } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import CoinId from "./pages/CoinId";

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
