import { Repository } from 'typeorm';
import { TTask } from '../../../@types';
import database from '../../../database';
import Task from '../entity';

class TasksService {
	readonly _repository: Repository<Task>;

	constructor(repository = database.getRepository(Task)) {
		this._repository = repository;
	}

	async create(taskData: TTask) {
		const { description } = taskData;
		if (!description) throw new Error('No data was provided.');
		const newTask = new Task(taskData);
		await this._repository.save(newTask);
		return newTask;
	}

	async readAll() {
		return await this._repository.find();
	}
}

export default TasksService;
