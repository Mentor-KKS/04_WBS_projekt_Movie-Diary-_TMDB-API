// ONLY FOR TESTING !!!
// Polyfill for sessionStorage in Node.js (for testing only)
global.sessionStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = value.toString();
  },
  removeItem(key) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  },
};

export default global.sessionStorage;

// ONLY FOR TESTING !!!
