import { TTask } from '../../@types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Task {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Column()
	description: string;

	@Column()
	isDone: boolean = false;

	@Column()
	createdAt: Date = new Date();

	constructor(task?: TTask) {
		if (!task) return;
		const { description } = task;
		this.description = description;
	}
}

export default Task;
