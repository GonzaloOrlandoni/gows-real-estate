import { useState, useEffect } from 'react';
const KEY = 'gows_re_favs';
export function useFavorites() {
  const [favs, setFavs] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  });
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(favs)); }, [favs]);
  const toggle = (id) => setFavs(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  const isFav = (id) => favs.includes(id);
  return { favs, toggle, isFav, count: favs.length };
}
