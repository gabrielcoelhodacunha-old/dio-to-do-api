import { TasksService, NoDataError } from '.';

const create = () =>
	describe('create method', () => {
		it('should create one Task', async () => {
			const tasks = [{ description: 'Test' }];
			const createdTask = await TasksService.create(tasks);

			expect(createdTask).toHaveLength(1);
			expect(createdTask[0]).toMatchObject({ description: 'Test' });
		});

		it('should throw NoDataError', async () => {
			const tasks = [{ description: '' }];
			await expect(TasksService.create(tasks)).rejects.toThrowError(
				NoDataError
			);
		});

		it('should create multiple tasks', async () => {
			const tasks = [];
			const TASK_COUNT = 5;
			for (let TASK = 0; TASK < TASK_COUNT; TASK++) {
				tasks.push({ description: `Task ${TASK}` });
			}
			const createdTasks = await TasksService.create(tasks);
			expect(createdTasks).toHaveLength(TASK_COUNT);
		});

		it('should throw NoDataError', async () => {
			const tasks = [{ description: 'Task 1' }, { description: '' }];
			await expect(TasksService.create(tasks)).rejects.toThrowError(
				NoDataError
			);
		});
	});

export default create;
