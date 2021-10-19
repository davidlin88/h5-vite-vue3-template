export default {
  set: (k, v) =>
    localStorage.setItem(k, v),
  get: (k) => localStorage.getItem(k) || '',

  clear: k => localStorage.removeItem(k)
}
