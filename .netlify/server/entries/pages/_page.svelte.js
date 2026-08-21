import { c as create_ssr_component, e as escape, v as validate_component, d as each } from "../../chunks/ssr.js";
const StatCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { label } = $$props;
  let { value } = $$props;
  let { sub = "" } = $$props;
  let { color = "blue" } = $$props;
  const colorMap = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    green: "bg-green-50 border-green-200 text-green-700",
    red: "bg-red-50 border-red-200 text-red-700",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
    gray: "bg-gray-50 border-gray-200 text-gray-700"
  };
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.sub === void 0 && $$bindings.sub && sub !== void 0) $$bindings.sub(sub);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  return `<div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"><p class="text-sm text-gray-500 mb-1">${escape(label)}</p> <p class="text-2xl font-bold text-gray-900">${escape(value)}</p> ${sub ? `<p class="${"text-xs mt-1 " + escape(colorMap[color], true) + " px-2 py-0.5 rounded-full inline-block border"}">${escape(sub)}</p>` : ``}</div>`;
});
const StatusBadge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let style;
  let { status } = $$props;
  const styles = {
    paid: "bg-green-100 text-green-800",
    active: "bg-green-100 text-green-800",
    occupied: "bg-blue-100 text-blue-800",
    due: "bg-yellow-100 text-yellow-800",
    open: "bg-orange-100 text-orange-800",
    scheduled: "bg-blue-100 text-blue-800",
    in_progress: "bg-purple-100 text-purple-800",
    completed: "bg-green-100 text-green-800",
    late: "bg-red-100 text-red-800",
    partial: "bg-yellow-100 text-yellow-800",
    waived: "bg-gray-100 text-gray-800",
    expired: "bg-red-100 text-red-800",
    vacant: "bg-gray-100 text-gray-800",
    cancelled: "bg-red-100 text-red-800"
  };
  if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
  style = styles[status] ?? "bg-gray-100 text-gray-800";
  return `<span class="${"px-2 py-0.5 rounded-full text-xs font-medium " + escape(style, true)}">${escape(status.replace(/_/g, " "))}</span>`;
});
const mockProperty = {
  name: "Maple Street Duplex",
  address: "2728 B Street",
  city: "San Diego",
  state: "CA",
  postalCode: "92102"
};
const mockUnit = {
  unitNumber: "#102",
  bedrooms: 2,
  bathrooms: 1
};
const mockTenant = {
  firstName: "Jordan",
  lastName: "Rivera",
  email: "jordan.rivera@email.com"
};
const mockLease = {
  startDate: /* @__PURE__ */ new Date("2024-02-01"),
  endDate: /* @__PURE__ */ new Date("2025-01-31"),
  monthlyRent: 2200,
  securityDeposit: 2200,
  rentDueDay: 1,
  status: "active"
};
const mockPayments = [
  {
    id: "pay-1",
    leaseId: "lease-1",
    amount: 2200,
    dueDate: /* @__PURE__ */ new Date("2024-08-01"),
    paidDate: /* @__PURE__ */ new Date("2024-07-31"),
    paymentMethod: "bank_transfer",
    status: "paid",
    createdAt: /* @__PURE__ */ new Date("2024-07-31"),
    updatedAt: /* @__PURE__ */ new Date("2024-07-31")
  },
  {
    id: "pay-2",
    leaseId: "lease-1",
    amount: 2200,
    dueDate: /* @__PURE__ */ new Date("2024-07-01"),
    paidDate: /* @__PURE__ */ new Date("2024-07-01"),
    paymentMethod: "bank_transfer",
    status: "paid",
    createdAt: /* @__PURE__ */ new Date("2024-07-01"),
    updatedAt: /* @__PURE__ */ new Date("2024-07-01")
  }
];
const mockExpenses = [
  {
    id: "exp-1",
    propertyId: "prop-1",
    unitId: "unit-1",
    category: "repairs",
    description: "Plumbing repair - kitchen sink",
    amount: 285,
    expenseDate: /* @__PURE__ */ new Date("2024-08-05"),
    createdAt: /* @__PURE__ */ new Date("2024-08-05"),
    updatedAt: /* @__PURE__ */ new Date("2024-08-05")
  },
  {
    id: "exp-2",
    propertyId: "prop-1",
    category: "insurance",
    description: "Monthly landlord insurance",
    amount: 120,
    expenseDate: /* @__PURE__ */ new Date("2024-08-01"),
    createdAt: /* @__PURE__ */ new Date("2024-08-01"),
    updatedAt: /* @__PURE__ */ new Date("2024-08-01")
  }
];
const mockMaintenanceRequests = [
  {
    id: "maint-1",
    propertyId: "prop-1",
    unitId: "unit-1",
    title: "AC unit making noise",
    description: "The air conditioning unit has been making a loud rattling noise.",
    reportedDate: /* @__PURE__ */ new Date("2024-08-10"),
    status: "open",
    createdAt: /* @__PURE__ */ new Date("2024-08-10"),
    updatedAt: /* @__PURE__ */ new Date("2024-08-10")
  },
  {
    id: "maint-2",
    propertyId: "prop-1",
    unitId: "unit-1",
    title: "Kitchen sink drip",
    description: "Slow drip from kitchen faucet.",
    reportedDate: /* @__PURE__ */ new Date("2024-08-01"),
    scheduledDate: /* @__PURE__ */ new Date("2024-08-15"),
    status: "scheduled",
    estimatedCost: 150,
    createdAt: /* @__PURE__ */ new Date("2024-08-01"),
    updatedAt: /* @__PURE__ */ new Date("2024-08-12")
  }
];
const mockActivityEvents = [
  {
    id: "evt-1",
    type: "rent_payment_recorded",
    entityType: "rent_payment",
    entityId: "pay-1",
    description: "Rent payment of $2,200 recorded for August",
    occurredAt: /* @__PURE__ */ new Date("2024-07-31"),
    createdAt: /* @__PURE__ */ new Date("2024-07-31")
  },
  {
    id: "evt-2",
    type: "maintenance_reported",
    entityType: "maintenance",
    entityId: "maint-1",
    description: "Maintenance request reported: AC unit making noise",
    occurredAt: /* @__PURE__ */ new Date("2024-08-10"),
    createdAt: /* @__PURE__ */ new Date("2024-08-10")
  },
  {
    id: "evt-3",
    type: "maintenance_scheduled",
    entityType: "maintenance",
    entityId: "maint-2",
    description: "Kitchen sink drip repair scheduled for Aug 15",
    occurredAt: /* @__PURE__ */ new Date("2024-08-12"),
    createdAt: /* @__PURE__ */ new Date("2024-08-12")
  },
  {
    id: "evt-4",
    type: "expense_recorded",
    entityType: "expense",
    entityId: "exp-1",
    description: "Expense recorded: Plumbing repair - $285",
    occurredAt: /* @__PURE__ */ new Date("2024-08-05"),
    createdAt: /* @__PURE__ */ new Date("2024-08-05")
  }
];
function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const now = /* @__PURE__ */ new Date();
  const monthlyIncome = mockPayments.filter((p) => p.status === "paid" && p.paidDate !== void 0 && p.paidDate.getMonth() === now.getMonth() && p.paidDate.getFullYear() === now.getFullYear()).reduce((sum, p) => sum + p.amount, 0);
  const monthlyExpenses = mockExpenses.reduce((sum, e) => sum + e.amount, 0);
  const netIncome = monthlyIncome - monthlyExpenses;
  const openMaintenance = mockMaintenanceRequests.filter((r) => r.status === "open" || r.status === "scheduled");
  const nextDueDate = /* @__PURE__ */ new Date();
  nextDueDate.setDate(mockLease.rentDueDay);
  if (nextDueDate <= /* @__PURE__ */ new Date()) nextDueDate.setMonth(nextDueDate.getMonth() + 1);
  return `${$$result.head += `<!-- HEAD_svelte-qmgu3g_START -->${$$result.title = `<title>Dashboard — RentalOS</title>`, ""}<!-- HEAD_svelte-qmgu3g_END -->`, ""} <div class="space-y-6"><div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"><div class="flex flex-wrap gap-6 items-start"><div><p class="text-xs text-gray-500 uppercase tracking-wide" data-svelte-h="svelte-1oyrolb">Property</p> <p class="text-base font-semibold text-gray-900">${escape(mockProperty.name)}</p> <p class="text-sm text-gray-500">${escape(mockProperty.address)}, ${escape(mockProperty.city)}, ${escape(mockProperty.state)} ${escape(mockProperty.postalCode)}</p></div> <div><p class="text-xs text-gray-500 uppercase tracking-wide" data-svelte-h="svelte-1rn2nvu">Unit</p> <p class="text-base font-semibold text-gray-900">${escape(mockUnit.unitNumber)}</p> <p class="text-sm text-gray-500">${escape(mockUnit.bedrooms)} bd / ${escape(mockUnit.bathrooms)} ba</p></div> <div><p class="text-xs text-gray-500 uppercase tracking-wide" data-svelte-h="svelte-3984mc">Tenant</p> <p class="text-base font-semibold text-gray-900">${escape(mockTenant.firstName)} ${escape(mockTenant.lastName)}</p> <p class="text-sm text-gray-500">${escape(mockTenant.email)}</p></div> <div><p class="text-xs text-gray-500 uppercase tracking-wide" data-svelte-h="svelte-1uuf8z6">Lease</p> <p class="text-sm text-gray-700">${escape(formatDate(mockLease.startDate))} – ${escape(formatDate(mockLease.endDate))}</p> ${validate_component(StatusBadge, "StatusBadge").$$render($$result, { status: mockLease.status }, {}, {})}</div></div></div> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">${validate_component(StatCard, "StatCard").$$render(
    $$result,
    {
      label: "Monthly Rent",
      value: formatCurrency(mockLease.monthlyRent)
    },
    {},
    {}
  )} ${validate_component(StatCard, "StatCard").$$render(
    $$result,
    {
      label: "Security Deposit",
      value: formatCurrency(mockLease.securityDeposit),
      color: "gray"
    },
    {},
    {}
  )} ${validate_component(StatCard, "StatCard").$$render(
    $$result,
    {
      label: "Monthly Income",
      value: formatCurrency(monthlyIncome),
      color: "green"
    },
    {},
    {}
  )} ${validate_component(StatCard, "StatCard").$$render(
    $$result,
    {
      label: "Monthly Expenses",
      value: formatCurrency(monthlyExpenses),
      color: "red"
    },
    {},
    {}
  )} ${validate_component(StatCard, "StatCard").$$render(
    $$result,
    {
      label: "Net Income",
      value: formatCurrency(netIncome),
      color: netIncome >= 0 ? "green" : "red"
    },
    {},
    {}
  )} ${validate_component(StatCard, "StatCard").$$render(
    $$result,
    {
      label: "Next Rent Due",
      value: formatDate(nextDueDate),
      sub: mockPayments[0]?.status === "paid" ? "paid" : "due",
      color: mockPayments[0]?.status === "paid" ? "green" : "yellow"
    },
    {},
    {}
  )}</div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="bg-white rounded-xl border border-gray-200 shadow-sm"><div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between"><h3 class="font-semibold text-gray-800" data-svelte-h="svelte-17qavb9">Open Maintenance</h3> <span class="text-sm text-gray-400">${escape(openMaintenance.length)} open</span></div> <div class="divide-y divide-gray-50">${each(openMaintenance, (req) => {
    return `<div class="px-6 py-4"><div class="flex items-start justify-between gap-2"><div><p class="text-sm font-medium text-gray-900">${escape(req.title)}</p> <p class="text-xs text-gray-500 mt-0.5">${escape(req.description)}</p></div> ${validate_component(StatusBadge, "StatusBadge").$$render($$result, { status: req.status }, {}, {})}</div> <p class="text-xs text-gray-400 mt-2">Reported ${escape(formatDate(req.reportedDate))}</p> </div>`;
  })} ${openMaintenance.length === 0 ? `<p class="px-6 py-4 text-sm text-gray-400" data-svelte-h="svelte-62dqh4">No open maintenance requests.</p>` : ``}</div></div> <div class="bg-white rounded-xl border border-gray-200 shadow-sm"><div class="px-6 py-4 border-b border-gray-100" data-svelte-h="svelte-j8rqr5"><h3 class="font-semibold text-gray-800">Recent Activity</h3></div> <div class="divide-y divide-gray-50">${each([...mockActivityEvents].sort((a, b) => b.occurredAt.getTime() - a.occurredAt.getTime()), (evt) => {
    return `<div class="px-6 py-3"><p class="text-sm text-gray-800">${escape(evt.description)}</p> <p class="text-xs text-gray-400 mt-0.5">${escape(formatDate(evt.occurredAt))}</p> </div>`;
  })}</div></div></div></div>`;
});
export {
  Page as default
};
