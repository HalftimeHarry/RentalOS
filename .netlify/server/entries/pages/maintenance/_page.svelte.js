import { c as create_ssr_component } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-rs0xzq_START -->${$$result.title = `<title>Maintenance — RentalOS</title>`, ""}<!-- HEAD_svelte-rs0xzq_END -->`, ""} <div class="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400" data-svelte-h="svelte-1yf0jr2"><p class="text-lg font-medium">Maintenance</p> <p class="text-sm mt-2">Coming soon — track maintenance requests here.</p></div>`;
});
export {
  Page as default
};
