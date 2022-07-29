import { TasksService, InvalidDataError } from '.';

const readById = () =>
	describe('readById method', () => {
		it('should read one Task', async () => {
			const taskToRead = (
				await TasksService.create([{ description: 'Task' }])
			)[0];
			for (let TASK = 0; TASK < 2; TASK++) {
				await TasksService.create([{ description: `Task ${TASK}` }]);
			}
			const taskRead = await TasksService.readById(taskToRead.id);
			expect(taskRead.id).toBe(taskToRead.id);
		});

		it('should throw InvalidDataError', async () => {
			const fakeTaskId = 150;
			await expect(TasksService.readById(fakeTaskId)).rejects.toThrowError(
				InvalidDataError
			);
		});
	});

export default readById;
