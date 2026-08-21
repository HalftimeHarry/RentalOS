import type { Expense } from '../domain/expense.js';
import type { ExpenseRepository } from '../repositories/expense-repository.js';

export class ExpenseService {
	constructor(private readonly expenseRepository: ExpenseRepository) {}

	async getExpensesByProperty(propertyId: string): Promise<Expense[]> {
		return this.expenseRepository.findByPropertyId(propertyId);
	}

	async createExpense(
		data: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>
	): Promise<Expense> {
		return this.expenseRepository.create(data);
	}

	calculateMonthlyExpenses(expenses: Expense[]): number {
		const now = new Date();
		return expenses
			.filter(
				(e) =>
					e.expenseDate.getMonth() === now.getMonth() &&
					e.expenseDate.getFullYear() === now.getFullYear()
			)
			.reduce((sum, e) => sum + e.amount, 0);
	}
}
