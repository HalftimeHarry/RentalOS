

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/vendors/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.CFHMtP5m.js","_app/immutable/chunks/CZmuBx9L.js","_app/immutable/chunks/DP-DQ0kB.js"];
export const stylesheets = [];
export const fonts = [];
