import { TTask } from '../../@types';
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
		const { description, isDone } = task;
		this.description = description;
		if (!isDone) return;
		this.isDone = isDone;
	}
}

export default Task;
