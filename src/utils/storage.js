export function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export function clearData(key) {
  localStorage.removeItem(key);
}
