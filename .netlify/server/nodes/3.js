

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/documents/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.BS4K9OP_.js","_app/immutable/chunks/CZmuBx9L.js","_app/immutable/chunks/DP-DQ0kB.js"];
export const stylesheets = [];
export const fonts = [];
