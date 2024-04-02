export function localStorageSetData(input, data) {
  localStorage.setItem(input, JSON.stringify(data));
  return;
}

export function localStorageGetData(data) {
  return JSON.parse(localStorage.getItem(data));
}
