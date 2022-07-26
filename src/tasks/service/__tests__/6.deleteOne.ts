import { TasksService, InvalidDataError } from '.';

const deleteOne = () =>
	describe('deleteOne method', () => {
		it('should delete the Task', async () => {
			const { id } = await TasksService.createOne({ description: 'Task' });
			await expect(TasksService.deleteOne(id)).resolves.not.toThrowError();
		});
		it('should throw InvalidDataError', async () => {
			const fakeTaskId = 150;
			await expect(TasksService.deleteOne(fakeTaskId)).rejects.toThrowError(
				InvalidDataError
			);
		});
	});

export default deleteOne;
