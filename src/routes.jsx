import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Root from "./pages/Root";
import CoinId from "./pages/CoinId";
import Favorites from "./pages/Favorites";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />       
          <Route path="home" element={<Home />} /> 
          <Route path="coin/:slug" element={<CoinId />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
