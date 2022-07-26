import { TasksService } from '.';

const deleteAll = () =>
	describe('deleteAll method', () => {
		it('should delete all Tasks', async () => {
			const TASK_COUNT = 5;
			for (let TASK = 0; TASK < TASK_COUNT; TASK++) {
				await TasksService.createOne({ description: `Task ${TASK}` });
			}
			await TasksService.deleteAll();
			const tasks = await TasksService.readAll();
			expect(tasks).toHaveLength(0);
		});
	});

export default deleteAll;
