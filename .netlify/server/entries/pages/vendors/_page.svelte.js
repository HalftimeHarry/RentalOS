import { c as create_ssr_component } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-mfjaka_START -->${$$result.title = `<title>Vendors — RentalOS</title>`, ""}<!-- HEAD_svelte-mfjaka_END -->`, ""} <div class="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400" data-svelte-h="svelte-36ufgh"><p class="text-lg font-medium">Vendors</p> <p class="text-sm mt-2">Coming soon — manage vendors and contractors here.</p></div>`;
});
export {
  Page as default
};
