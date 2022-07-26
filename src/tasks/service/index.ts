import { TTask } from '../../../@types';
import database from '../../../database';
import Task from '../entity';
import { InvalidDataError, NoDataError } from '../errors';

const _repository = database.getRepository(Task);

const TasksService = {
	async createOne(taskData: TTask): Promise<Task> {
		const { description } = taskData;
		if (!description) throw new NoDataError();
		return await _repository.save(new Task(taskData));
	},

	async createMultiple(tasks: TTask[]): Promise<Task[]> {
		const createdTasks = [];
		for (const task of tasks) {
			createdTasks.push(await this.createOne(task));
		}
		return createdTasks;
	},

	async readOne(id: number): Promise<Task> {
		const task = await _repository.findOneBy({ id });
		if (!task) throw new InvalidDataError();
		return task;
	},

	async readAll(): Promise<Task[]> {
		return await _repository.find();
	},

	async updateOne({ id, description, isDone }: TTask): Promise<void> {
		const result = await _repository
			.createQueryBuilder()
			.update()
			.set({ description, isDone })
			.where('id = :id', { id })
			.execute();
		if (!result.affected) throw new InvalidDataError();
	},

	async deleteOne(id: number): Promise<void> {
		const result = await _repository
			.createQueryBuilder()
			.delete()
			.where('id = :id', { id })
			.execute();
		if (!result.affected) throw new InvalidDataError();
	},

	async deleteMultiple(ids: number[]): Promise<void> {
		const result = await _repository
			.createQueryBuilder()
			.delete()
			.where('id IN (:...ids)', { ids })
			.execute();
		if (!result.affected) throw new InvalidDataError();
	},

	async deleteAll(): Promise<void> {
		await _repository.clear();
	},
};

export default TasksService;
