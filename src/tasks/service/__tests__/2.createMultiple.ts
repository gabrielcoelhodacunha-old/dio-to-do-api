import { TasksService, NoDataError } from '.';

const createMultiple = () =>
	describe('createMultiple method', () => {
		it('should create multiple tasks', async () => {
			const tasks = [];
			const TASK_COUNT = 5;
			for (let TASK = 0; TASK < TASK_COUNT; TASK++) {
				tasks.push({ description: `Task ${TASK}` });
			}
			const createdTasks = await TasksService.createMultiple(tasks);
			expect(createdTasks).toHaveLength(TASK_COUNT);
		});

		it('should throw NoDataError', async () => {
			const tasks = [{ description: 'Task 1' }, { description: '' }];
			await expect(TasksService.createMultiple(tasks)).rejects.toThrowError(
				NoDataError
			);
		});
	});

export default createMultiple;
