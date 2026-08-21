import type { Expense } from '../domain/expense.js';

export interface ExpenseRepository {
	findById(id: string): Promise<Expense | null>;
	findByPropertyId(propertyId: string): Promise<Expense[]>;
	findAll(): Promise<Expense[]>;
	create(data: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>): Promise<Expense>;
	update(id: string, data: Partial<Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Expense>;
	delete(id: string): Promise<void>;
}
