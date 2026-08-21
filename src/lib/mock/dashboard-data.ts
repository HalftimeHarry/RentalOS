import type { Property } from '../domain/property.js';
import type { Unit } from '../domain/unit.js';
import type { Tenant } from '../domain/tenant.js';
import type { Lease } from '../domain/lease.js';
import type { RentPayment } from '../domain/rent-payment.js';
import type { Expense } from '../domain/expense.js';
import type { MaintenanceRequest } from '../domain/maintenance-request.js';
import type { ActivityEvent } from '../domain/activity-event.js';

export const mockProperty: Property = {
	id: 'prop-1',
	name: 'Maple Street Duplex',
	address: '2728 B Street',
	city: 'San Diego',
	state: 'CA',
	postalCode: '92102',
	createdAt: new Date('2024-01-01'),
	updatedAt: new Date('2024-01-01')
};

export const mockUnit: Unit = {
	id: 'unit-1',
	propertyId: 'prop-1',
	unitNumber: '#102',
	bedrooms: 2,
	bathrooms: 1,
	monthlyRent: 2200,
	status: 'occupied',
	createdAt: new Date('2024-01-01'),
	updatedAt: new Date('2024-01-01')
};

export const mockTenant: Tenant = {
	id: 'tenant-1',
	firstName: 'Jordan',
	lastName: 'Rivera',
	email: 'jordan.rivera@email.com',
	phone: '(619) 555-0142',
	emergencyContact: {
		name: 'Maria Rivera',
		relationship: 'Sister',
		phone: '(619) 555-0199'
	},
	createdAt: new Date('2024-01-15'),
	updatedAt: new Date('2024-01-15')
};

export const mockLease: Lease = {
	id: 'lease-1',
	unitId: 'unit-1',
	tenantId: 'tenant-1',
	startDate: new Date('2024-02-01'),
	endDate: new Date('2025-01-31'),
	monthlyRent: 2200,
	securityDeposit: 2200,
	rentDueDay: 1,
	status: 'active',
	createdAt: new Date('2024-01-15'),
	updatedAt: new Date('2024-01-15')
};

export const mockPayments: RentPayment[] = [
	{
		id: 'pay-1',
		leaseId: 'lease-1',
		amount: 2200,
		dueDate: new Date('2024-08-01'),
		paidDate: new Date('2024-07-31'),
		paymentMethod: 'bank_transfer',
		status: 'paid',
		createdAt: new Date('2024-07-31'),
		updatedAt: new Date('2024-07-31')
	},
	{
		id: 'pay-2',
		leaseId: 'lease-1',
		amount: 2200,
		dueDate: new Date('2024-07-01'),
		paidDate: new Date('2024-07-01'),
		paymentMethod: 'bank_transfer',
		status: 'paid',
		createdAt: new Date('2024-07-01'),
		updatedAt: new Date('2024-07-01')
	}
];

export const mockExpenses: Expense[] = [
	{
		id: 'exp-1',
		propertyId: 'prop-1',
		unitId: 'unit-1',
		category: 'repairs',
		description: 'Plumbing repair - kitchen sink',
		amount: 285,
		expenseDate: new Date('2024-08-05'),
		createdAt: new Date('2024-08-05'),
		updatedAt: new Date('2024-08-05')
	},
	{
		id: 'exp-2',
		propertyId: 'prop-1',
		category: 'insurance',
		description: 'Monthly landlord insurance',
		amount: 120,
		expenseDate: new Date('2024-08-01'),
		createdAt: new Date('2024-08-01'),
		updatedAt: new Date('2024-08-01')
	}
];

export const mockMaintenanceRequests: MaintenanceRequest[] = [
	{
		id: 'maint-1',
		propertyId: 'prop-1',
		unitId: 'unit-1',
		title: 'AC unit making noise',
		description: 'The air conditioning unit has been making a loud rattling noise.',
		reportedDate: new Date('2024-08-10'),
		status: 'open',
		createdAt: new Date('2024-08-10'),
		updatedAt: new Date('2024-08-10')
	},
	{
		id: 'maint-2',
		propertyId: 'prop-1',
		unitId: 'unit-1',
		title: 'Kitchen sink drip',
		description: 'Slow drip from kitchen faucet.',
		reportedDate: new Date('2024-08-01'),
		scheduledDate: new Date('2024-08-15'),
		status: 'scheduled',
		estimatedCost: 150,
		createdAt: new Date('2024-08-01'),
		updatedAt: new Date('2024-08-12')
	}
];

export const mockActivityEvents: ActivityEvent[] = [
	{
		id: 'evt-1',
		type: 'rent_payment_recorded',
		entityType: 'rent_payment',
		entityId: 'pay-1',
		description: 'Rent payment of $2,200 recorded for August',
		occurredAt: new Date('2024-07-31'),
		createdAt: new Date('2024-07-31')
	},
	{
		id: 'evt-2',
		type: 'maintenance_reported',
		entityType: 'maintenance',
		entityId: 'maint-1',
		description: 'Maintenance request reported: AC unit making noise',
		occurredAt: new Date('2024-08-10'),
		createdAt: new Date('2024-08-10')
	},
	{
		id: 'evt-3',
		type: 'maintenance_scheduled',
		entityType: 'maintenance',
		entityId: 'maint-2',
		description: 'Kitchen sink drip repair scheduled for Aug 15',
		occurredAt: new Date('2024-08-12'),
		createdAt: new Date('2024-08-12')
	},
	{
		id: 'evt-4',
		type: 'expense_recorded',
		entityType: 'expense',
		entityId: 'exp-1',
		description: 'Expense recorded: Plumbing repair - $285',
		occurredAt: new Date('2024-08-05'),
		createdAt: new Date('2024-08-05')
	}
];
