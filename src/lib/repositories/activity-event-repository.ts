import type { ActivityEvent } from '../domain/activity-event.js';

export interface ActivityEventRepository {
	findById(id: string): Promise<ActivityEvent | null>;
	findRecent(limit?: number): Promise<ActivityEvent[]>;
	findByEntityId(entityId: string): Promise<ActivityEvent[]>;
	create(data: Omit<ActivityEvent, 'id' | 'createdAt'>): Promise<ActivityEvent>;
}
