// src/declarations.d.ts (or in the root of your `src` folder)
declare module "*.wasm" {
  const value: string; // Treat `.wasm` as a URL to the file
  export default value;
}

// src/declarations.d.ts (or in the root of your `src` folder)
declare module "*.ttf" {
  const value: string; // Treat `.wasm` as a URL to the file
  export default value;
}
