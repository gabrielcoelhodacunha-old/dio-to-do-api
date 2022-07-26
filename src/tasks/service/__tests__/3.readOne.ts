import { TasksService, InvalidDataError } from '.';

const readOne = () =>
	describe('readOne method', () => {
		it('should read one Task', async () => {
			const taskToRead = await TasksService.createOne({ description: 'Task' });
			for (let TASK = 0; TASK < 2; TASK++) {
				await TasksService.createOne({ description: `Task ${TASK}` });
			}
			const taskRead = await TasksService.readOne(taskToRead.id);
			expect(taskRead.id).toBe(taskToRead.id);
		});

		it('should throw InvalidDataError', async () => {
			const fakeTaskId = 150;
			await expect(TasksService.readOne(fakeTaskId)).rejects.toThrowError(
				InvalidDataError
			);
		});
	});

export default readOne;
