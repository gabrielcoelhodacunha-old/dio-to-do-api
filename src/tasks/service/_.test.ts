import { Repository } from 'typeorm';
import database, { FILE_PATH } from '../../../database';
import { deleteFile } from '../../utils/files';
import Task from '../../tasks/entity';
import TasksService from '.';

describe('TasksService', () => {
	let repository: Repository<Task>;
	let service: TasksService;

	beforeAll(async () => {
		await database.initialize();
		repository = database.getRepository(Task);
		service = new TasksService(repository);
	});

	afterEach(async () => {
		await database.createQueryBuilder().delete().from(Task).execute();
	});

	afterAll(async () => {
		deleteFile(FILE_PATH);
	});

	describe('create method', () => {
		it('should create task', async () => {
			const taskData = { description: 'Test' };
			const newTask = await service.create(taskData);

			expect(newTask).toHaveProperty('id');
			expect(newTask).toHaveProperty('description');
			expect(newTask).toHaveProperty('isDone');
			expect(newTask).toHaveProperty('createdAt');
		});

		it('should throw error', () => {
			const taskData = { description: '' };
			expect(service.create(taskData)).rejects.toThrowError();
		});
	});

	describe('readAll method', () => {
		it('should read all tasks', async () => {
			const TASK_COUNT = 5;
			for (let TASK = 0; TASK < TASK_COUNT; TASK++) {
				await service.create({ description: `Task ${TASK}` });
			}
			const allTasks = await service.readAll();
			expect(allTasks).toHaveLength(TASK_COUNT);
		});
	});
});
