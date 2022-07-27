import { TObject, TTask } from '../../@types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Task {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Column()
	description: string;

	@Column({ default: false })
	isDone: boolean;

	@Column({ default: () => 'DATETIME()' })
	createdAt: Date;

	constructor(task?: TTask) {
		if (!task) return;
		Object.entries(task).forEach(([key, value]) => {
			if (!value) return;
			(this as TObject)[key] = value;
		});
	}
}

export default Task;
