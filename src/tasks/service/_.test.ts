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
		await repository.clear();
	});

	afterAll(async () => {
		deleteFile(FILE_PATH);
	});

	describe('createOne method', () => {
		it('should create one Task', async () => {
			const taskData = { description: 'Test' };
			const newTask = await service.createOne(taskData);

			expect(newTask).toHaveProperty('id');
			expect(newTask).toHaveProperty('description');
			expect(newTask).toHaveProperty('isDone');
			expect(newTask).toHaveProperty('createdAt');
		});

		it('should throw error', async () => {
			const taskData = { description: '' };
			await expect(service.createOne(taskData)).rejects.toThrowError();
		});
	});

	describe('createMultiple method', () => {
		it('should create multiple tasks', async () => {
			const tasks = [];
			const TASK_COUNT = 5;
			for (let TASK = 0; TASK < TASK_COUNT; TASK++) {
				tasks.push({ description: `Task ${TASK}` });
			}
			const createdTasks = await service.createMultiple(tasks);
			expect(createdTasks.length).toBe(TASK_COUNT);
		});

		it('should throw error', async () => {
			const tasks = [{ description: 'Task 1' }, { description: '' }];
			await expect(service.createMultiple(tasks)).rejects.toThrowError();
		});
	});

	describe('readOne method', () => {
		it('should read one Task', async () => {
			const taskToRead = await service.createOne({ description: 'Task' });
			for (let TASK = 0; TASK < 2; TASK++) {
				await service.createOne({ description: `Task ${TASK}` });
			}
			const taskRead = await service.readOne(taskToRead.id);
			expect(taskRead.id).toBe(taskToRead.id);
		});

		it('should throw error', async () => {
			const fakeTaskId = 150;
			await expect(service.readOne(fakeTaskId)).rejects.toThrowError();
		});
	});

	describe('readAll method', () => {
		it('should read all Tasks', async () => {
			const TASK_COUNT = 5;
			for (let TASK = 0; TASK < TASK_COUNT; TASK++) {
				await service.createOne({ description: `Task ${TASK}` });
			}
			const allTasks = await service.readAll();
			expect(allTasks).toHaveLength(TASK_COUNT);
		});
	});

	describe('updateOne method', () => {
		it('should update the Task', async () => {
			const taskToUpdate = await service.createOne({ description: 'Task' });
			await service.updateOne({
				...taskToUpdate,
				description: 'Updated',
				isDone: true,
			});
			expect(await service.readOne(taskToUpdate.id)).toMatchObject({
				...taskToUpdate,
				description: 'Updated',
				isDone: true,
			});
		});

		it('should throw error', async () => {
			const fakeTask = { id: 150, description: 'Test', isDone: true };
			await expect(service.updateOne(fakeTask)).rejects.toThrowError();
		});
	});

	describe('deleteOne method', () => {
		it('should delete the Task', async () => {
			const { id } = await service.createOne({ description: 'Task' });
			await expect(service.deleteOne(id)).resolves.not.toThrowError();
		});

		it('should throw error', async () => {
			const fakeTaskId = 150;
			await expect(service.deleteOne(fakeTaskId)).rejects.toThrowError();
		});
	});

	describe('deleteMultiple method', () => {
		it('should delete multiple Tasks', async () => {
			let tasksIdsToDelete = [];
			const TASK_COUNT = 5;
			for (let TASK = 0; TASK < TASK_COUNT; TASK++) {
				const { id } = await service.createOne({ description: `Task ${TASK}` });
				tasksIdsToDelete.push(id);
			}
			tasksIdsToDelete.splice(0, 2);
			await service.deleteMultiple(tasksIdsToDelete);
			const tasks = await service.readAll();
			expect(tasks.length).toBe(TASK_COUNT - tasksIdsToDelete.length);
		});
	});

	describe('deleteAll method', () => {
		it('should delete all Tasks', async () => {
			const TASK_COUNT = 5;
			for (let TASK = 0; TASK < TASK_COUNT; TASK++) {
				await service.createOne({ description: `Task ${TASK}` });
			}
			await service.deleteAll();
			const tasks = await service.readAll();
			expect(tasks.length).toBe(0);
		});
	});
});
