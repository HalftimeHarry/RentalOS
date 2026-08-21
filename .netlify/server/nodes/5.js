

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/leases/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.CM8ZNOKw.js","_app/immutable/chunks/CZmuBx9L.js","_app/immutable/chunks/DP-DQ0kB.js"];
export const stylesheets = [];
export const fonts = [];
