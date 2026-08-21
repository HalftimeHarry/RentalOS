

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.D1056bt8.js","_app/immutable/chunks/CZmuBx9L.js","_app/immutable/chunks/DP-DQ0kB.js","_app/immutable/chunks/D6YF6ztN.js"];
export const stylesheets = [];
export const fonts = [];
