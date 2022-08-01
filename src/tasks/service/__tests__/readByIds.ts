import { TasksService, InvalidDataError } from '.';

const readByIds = () =>
	describe('readByIds method', () => {
		it('should read one Task', async () => {
			const taskToRead = (
				await TasksService.create([{ description: 'Task' }])
			)[0];
			for (let TASK = 0; TASK < 2; TASK++) {
				await TasksService.create([{ description: `Task ${TASK}` }]);
			}
			const taskRead = await TasksService.readByIds([taskToRead.id]);
			expect(taskRead[0].id).toBe(taskToRead.id);
		});

		it('should throw InvalidDataError', async () => {
			const fakeTaskId = 150;
			await expect(TasksService.readByIds([fakeTaskId])).rejects.toThrowError(
				InvalidDataError
			);
		});
	});

export default readByIds;
