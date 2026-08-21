import { c as create_ssr_component, s as subscribe, d as each, f as add_attribute, e as escape, v as validate_component } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const navItems = [
    {
      href: "/",
      label: "Dashboard",
      icon: "🏠"
    },
    {
      href: "/properties",
      label: "Properties",
      icon: "🏢"
    },
    {
      href: "/tenants",
      label: "Tenants",
      icon: "👤"
    },
    {
      href: "/leases",
      label: "Leases",
      icon: "📄"
    },
    {
      href: "/rent",
      label: "Rent",
      icon: "💰"
    },
    {
      href: "/expenses",
      label: "Expenses",
      icon: "📊"
    },
    {
      href: "/maintenance",
      label: "Maintenance",
      icon: "🔧"
    },
    {
      href: "/vendors",
      label: "Vendors",
      icon: "🏪"
    },
    {
      href: "/documents",
      label: "Documents",
      icon: "📁"
    }
  ];
  $$unsubscribe_page();
  return `<aside class="w-64 bg-blue-900 text-white flex flex-col shadow-lg"><div class="p-6 border-b border-blue-800" data-svelte-h="svelte-1qdh5si"><h1 class="text-xl font-bold tracking-wide">RentalOS</h1> <p class="text-blue-300 text-xs mt-1">Property Management</p></div> <nav class="flex-1 p-4 space-y-1">${each(navItems, (item) => {
    return `<a${add_attribute("href", item.href, 0)} class="${"flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors " + escape(
      $page.url.pathname === item.href ? "bg-blue-700 text-white font-medium" : "text-blue-200 hover:bg-blue-800 hover:text-white",
      true
    )}"><span class="text-base">${escape(item.icon)}</span> ${escape(item.label)} </a>`;
  })}</nav> <div class="p-4 border-t border-blue-800" data-svelte-h="svelte-1vmgrqp"><p class="text-blue-400 text-xs">v0.1.0</p></div></aside>`;
});
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let title;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const pageTitles = {
    "/": "Dashboard",
    "/properties": "Properties",
    "/tenants": "Tenants",
    "/leases": "Leases",
    "/rent": "Rent",
    "/expenses": "Expenses",
    "/maintenance": "Maintenance",
    "/vendors": "Vendors",
    "/documents": "Documents"
  };
  title = pageTitles[$page.url.pathname] ?? "RentalOS";
  $$unsubscribe_page();
  return `<header class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between"><h2 class="text-lg font-semibold text-gray-800">${escape(title)}</h2> <div class="flex items-center gap-3" data-svelte-h="svelte-3dhxw9"><span class="text-sm text-gray-500">Maple Street Duplex</span> <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">L</div></div></header>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex h-screen bg-gray-50">${validate_component(Sidebar, "Sidebar").$$render($$result, {}, {}, {})} <div class="flex flex-col flex-1 overflow-hidden">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <main class="flex-1 overflow-y-auto p-6">${slots.default ? slots.default({}) : ``}</main></div></div>`;
});
export {
  Layout as default
};
