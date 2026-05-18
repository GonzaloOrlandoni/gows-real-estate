import { useState } from "react";
import { useFavorites } from "./hooks/useFavorites";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import PropertiesPage from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import FavoritesPage from "./pages/Favorites";

export default function App() {
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState(null);
  const { favs, toggle, isFav, count } = useFavorites();

  const props = { setPage, setSelected, isFav, onFav: toggle };

  return (
    <>
      <Navbar page={page} setPage={setPage} favCount={count} />
      {page === "home" && <HomePage {...props} />}
      {page === "properties" && <PropertiesPage {...props} />}
      {page === "detail" && selected && (
        <PropertyDetail
          prop={selected}
          isFav={isFav(selected.id)}
          onFav={toggle}
          setPage={setPage}
        />
      )}
      {page === "favorites" && (
        <FavoritesPage
          favs={favs}
          onFav={toggle}
          isFav={isFav}
          setPage={setPage}
          setSelected={setSelected}
        />
      )}
    </>
  );
}
