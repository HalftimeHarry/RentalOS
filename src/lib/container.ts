import type { PropertyRepository } from './repositories/property-repository.js';
import type { UnitRepository } from './repositories/unit-repository.js';
import type { LeaseRepository } from './repositories/lease-repository.js';
import type { RentPaymentRepository } from './repositories/rent-payment-repository.js';
import type { ExpenseRepository } from './repositories/expense-repository.js';
import type { MaintenanceRepository } from './repositories/maintenance-repository.js';
import type { VendorRepository } from './repositories/vendor-repository.js';
import type { ActivityEventRepository } from './repositories/activity-event-repository.js';
import { PropertyService } from './services/property-service.js';
import { LeaseService } from './services/lease-service.js';
import { RentPaymentService } from './services/rent-payment-service.js';
import { MaintenanceService } from './services/maintenance-service.js';
import { ExpenseService } from './services/expense-service.js';

export interface Repositories {
	property: PropertyRepository;
	unit: UnitRepository;
	lease: LeaseRepository;
	rentPayment: RentPaymentRepository;
	expense: ExpenseRepository;
	maintenance: MaintenanceRepository;
	vendor: VendorRepository;
	activityEvent: ActivityEventRepository;
}

export interface Services {
	property: PropertyService;
	lease: LeaseService;
	rentPayment: RentPaymentService;
	maintenance: MaintenanceService;
	expense: ExpenseService;
}

export function createServices(repositories: Repositories): Services {
	return {
		property: new PropertyService(repositories.property),
		lease: new LeaseService(repositories.lease),
		rentPayment: new RentPaymentService(repositories.rentPayment),
		maintenance: new MaintenanceService(repositories.maintenance),
		expense: new ExpenseService(repositories.expense)
	};
}
