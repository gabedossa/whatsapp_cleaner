require("@testing-library/jest-dom");

if (!global.requestAnimationFrame) {
  global.requestAnimationFrame = (callback) => setTimeout(() => callback(Date.now()), 16);
}

if (!global.cancelAnimationFrame) {
  global.cancelAnimationFrame = (id) => clearTimeout(id);
}
