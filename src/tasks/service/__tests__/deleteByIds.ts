import { TasksService, InvalidDataError } from '.';

const deleteByIds = () =>
	describe('deleteByIds method', () => {
		it('should delete the Task', async () => {
			const [{ id }] = await TasksService.create([{ description: 'Task' }]);
			await expect(TasksService.deleteByIds([id])).resolves.not.toThrowError();
		});
		it('should throw InvalidDataError', async () => {
			const fakeTaskId = 150;
			await expect(TasksService.deleteByIds([fakeTaskId])).rejects.toThrowError(
				InvalidDataError
			);
		});

		it('should delete multiple Tasks', async () => {
			let tasksIdsToDelete = [];
			const TASK_COUNT = 5;
			for (let TASK = 0; TASK < TASK_COUNT; TASK++) {
				const [{ id }] = await TasksService.create([
					{
						description: `Task ${TASK}`,
					},
				]);
				tasksIdsToDelete.push(id);
			}
			tasksIdsToDelete.splice(0, 2);
			await TasksService.deleteByIds(tasksIdsToDelete);
			const tasks = await TasksService.readAll();
			expect(tasks).toHaveLength(TASK_COUNT - tasksIdsToDelete.length);
		});
		it('should throw InvalidDataError', async () => {
			const fakeTasksIds = [100, 200, 300];
			await expect(TasksService.deleteByIds(fakeTasksIds)).rejects.toThrowError(
				InvalidDataError
			);
		});
	});

export default deleteByIds;
