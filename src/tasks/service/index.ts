import { TTask } from '../../../@types';
import database from '../../../database';
import Task from '../entity';
import { InvalidDataError, NoDataError } from '../errors';

const _repository = database.getRepository(Task);

const TasksService = {
	async create(tasks: TTask[]): Promise<Task[]> {
		tasks.some(({ description }) => {
			if (!description) throw new NoDataError();
		});
		const result = await _repository
			.createQueryBuilder()
			.insert()
			.values(tasks)
			.execute();
		const generatedValues = result.generatedMaps as Task[];
		return tasks.map((task, index) => ({ ...task, ...generatedValues[index] }));
	},

	async readById(id: number): Promise<Task> {
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

	async deleteByIds(ids: number[]): Promise<void> {
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
