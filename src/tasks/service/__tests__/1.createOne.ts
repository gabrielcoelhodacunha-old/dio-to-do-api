import { TasksService, NoDataError } from '.';

const createOne = () =>
	describe('createOne method', () => {
		it('should create one Task', async () => {
			const taskData = { description: 'Test' };
			const newTask = await TasksService.createOne(taskData);

			expect(newTask).toHaveProperty('id');
			expect(newTask).toHaveProperty('description');
			expect(newTask).toHaveProperty('isDone');
			expect(newTask).toHaveProperty('createdAt');
		});

		it('should throw NoDataError', async () => {
			const taskData = { description: '' };
			await expect(TasksService.createOne(taskData)).rejects.toThrowError(
				NoDataError
			);
		});
	});

export default createOne;
