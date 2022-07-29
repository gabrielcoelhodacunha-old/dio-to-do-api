import { TasksService } from '.';

const readAll = () =>
	describe('readAll method', () => {
		it('should read all Tasks', async () => {
			const TASK_COUNT = 5;
			for (let TASK = 0; TASK < TASK_COUNT; TASK++) {
				await TasksService.create([{ description: `Task ${TASK}` }]);
			}
			const allTasks = await TasksService.readAll();
			expect(allTasks).toHaveLength(TASK_COUNT);
		});
	});

export default readAll;
