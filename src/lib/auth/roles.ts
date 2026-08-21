export type UserRole = 'admin' | 'renter';

export const roleLabels: Record<UserRole, string> = {
	admin: 'Property team',
	renter: 'Renter'
};

export interface NavItem {
	href: string;
	label: string;
	icon: string;
	roles: UserRole[];
}

export const navItems: NavItem[] = [
	{ href: '/dashboard', label: 'Dashboard', icon: '⌂', roles: ['admin', 'renter'] },
	{ href: '/properties', label: 'Properties', icon: '▦', roles: ['admin'] },
	{ href: '/tenants', label: 'Tenants', icon: '◎', roles: ['admin'] },
	{ href: '/leases', label: 'Leases', icon: '▤', roles: ['admin', 'renter'] },
	{ href: '/rent', label: 'Rent', icon: '$', roles: ['admin', 'renter'] },
	{ href: '/expenses', label: 'Expenses', icon: '↗', roles: ['admin'] },
	{ href: '/maintenance', label: 'Maintenance', icon: '⌁', roles: ['admin', 'renter'] },
	{ href: '/vendors', label: 'Vendors', icon: '◇', roles: ['admin'] },
	{ href: '/documents', label: 'Documents', icon: '□', roles: ['admin', 'renter'] }
];

export function isUserRole(value: string | null): value is UserRole {
	return value === 'admin' || value === 'renter';
}
