

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/rent/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.CMYmQLEa.js","_app/immutable/chunks/CZmuBx9L.js","_app/immutable/chunks/DP-DQ0kB.js"];
export const stylesheets = [];
export const fonts = [];
