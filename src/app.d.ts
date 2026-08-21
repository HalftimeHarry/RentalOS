import type PocketBase from 'pocketbase';

export interface AuthUser {
	id: string;
	collectionId?: string;
	collectionName?: string;
	email: string;
	name?: string;
	role: 'admin' | 'renter';
}

declare global {
	namespace App {
		interface Locals {
			pb: PocketBase;
			user: AuthUser | null;
		}

		interface PageData {
			user: AuthUser | null;
		}
	}
}

export {};
