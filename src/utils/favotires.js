export function addFavorite(id) {
  const stored = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!stored.includes(id)) {
    stored.push(id);
    localStorage.setItem("favorites", JSON.stringify(stored));
  }
}

export function removeFavorite(id) {
  const stored = JSON.parse(localStorage.getItem("favorites")) || [];
  const filtered = stored.filter(favId => favId !== id);
  localStorage.setItem("favorites", JSON.stringify(filtered));
}

export function isFavorite(id) {
  const stored = JSON.parse(localStorage.getItem("favorites")) || [];
  return stored.includes(id);
}