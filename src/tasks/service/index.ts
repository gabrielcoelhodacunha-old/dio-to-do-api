import { Repository } from 'typeorm';
import { TTask } from '../../../@types';
import database from '../../../database';
import Task from '../entity';

const ERROR_NO_DATA = 'No data was provided.';
const ERROR_INVALID_DATA = 'Invalid data provided.';

class TasksService {
	readonly _repository: Repository<Task>;

	constructor(repository = database.getRepository(Task)) {
		this._repository = repository;
	}

	async createOne(taskData: TTask): Promise<Task> {
		const { description } = taskData;
		if (!description) throw new Error(ERROR_NO_DATA);
		return await this._repository.save(new Task(taskData));
	}

	async createMultiple(tasks: TTask[]): Promise<Task[]> {
		const createdTasks = [];
		for (const task of tasks) {
			createdTasks.push(await this.createOne(task));
		}
		return createdTasks;
	}

	async readOne(id: number): Promise<Task> {
		const task = await this._repository.findOneBy({ id });
		if (!task) throw new Error(ERROR_INVALID_DATA);
		return task;
	}

	async readAll(): Promise<Task[]> {
		return await this._repository.find();
	}

	async updateOne({ id, description, isDone }: TTask): Promise<void> {
		const result = await this._repository
			.createQueryBuilder()
			.update()
			.set({ description, isDone })
			.where('id = :id', { id })
			.execute();
		if (!result.affected) throw new Error(ERROR_INVALID_DATA);
	}

	async deleteOne(id: number): Promise<void> {
		const result = await this._repository
			.createQueryBuilder()
			.delete()
			.where('id = :id', { id })
			.execute();
		if (!result.affected) throw new Error(ERROR_INVALID_DATA);
	}

	async deleteMultiple(ids: number[]): Promise<void> {
		const result = await this._repository
			.createQueryBuilder()
			.delete()
			.where('id IN (:...ids)', { ids })
			.execute();
		if (!result.affected) throw new Error(ERROR_INVALID_DATA);
	}

	async deleteAll(): Promise<void> {
		await this._repository.clear();
	}
}

export default TasksService;
