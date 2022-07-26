import { TasksService, InvalidDataError } from '.';

const deleteMultiple = () =>
	describe('deleteMultiple method', () => {
		it('should delete multiple Tasks', async () => {
			let tasksIdsToDelete = [];
			const TASK_COUNT = 5;
			for (let TASK = 0; TASK < TASK_COUNT; TASK++) {
				const { id } = await TasksService.createOne({
					description: `Task ${TASK}`,
				});
				tasksIdsToDelete.push(id);
			}
			tasksIdsToDelete.splice(0, 2);
			await TasksService.deleteMultiple(tasksIdsToDelete);
			const tasks = await TasksService.readAll();
			expect(tasks).toHaveLength(TASK_COUNT - tasksIdsToDelete.length);
		});
		it('should throw InvalidDataError', async () => {
			const fakeTasksIds = [100, 200, 300];
			await expect(
				TasksService.deleteMultiple(fakeTasksIds)
			).rejects.toThrowError(InvalidDataError);
		});
	});

export default deleteMultiple;
