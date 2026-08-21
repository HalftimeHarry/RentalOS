

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/expenses/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.C5J_OKUk.js","_app/immutable/chunks/CZmuBx9L.js","_app/immutable/chunks/DP-DQ0kB.js"];
export const stylesheets = [];
export const fonts = [];
