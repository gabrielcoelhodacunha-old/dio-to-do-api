import {
	TasksController,
	NoDataError,
	Task,
	getMockReq,
	getMockRes,
	StatusCodes,
} from '.';

const createMultiple = () =>
	describe('createMultiple method', () => {
		describe('with description', () => {
			const createdTasks: Task[] = [];
			const TASK_COUNT = 5;
			for (let TASK = 0; TASK < TASK_COUNT; TASK++) {
				createdTasks.push({
					description: `Task ${TASK}`,
					isDone: !!(TASK % 2),
				} as Task);
			}
			const mockedRequest = getMockReq({ body: { tasks: createdTasks } });
			const { res: mockedResponse } = getMockRes({ locals: { createdTasks } });

			beforeAll(async () => {
				await TasksController.createMultiple(mockedRequest, mockedResponse);
			});

			it('should return status 201 (CREATED)', async () => {
				expect(mockedResponse.status).toHaveBeenCalledWith(StatusCodes.CREATED);
			});

			it('should return createdTasks', async () => {
				expect(mockedResponse.locals.createdTasks).toMatchObject(createdTasks);
			});
		});

		describe('without description', () => {
			const createdTasks: Task[] = [{ description: 'Task' } as Task];
			const TASK_COUNT = 5;
			for (let TASK = 0; TASK < TASK_COUNT; TASK++) {
				createdTasks.push({ isDone: !!(TASK % 2) } as Task);
			}
			const mockedRequest = getMockReq({ body: { tasks: createdTasks } });
			const { res: mockedResponse } = getMockRes();

			beforeAll(async () => {
				await TasksController.createMultiple(mockedRequest, mockedResponse);
			});

			it('should return status 400 (BAD_REQUEST)', async () => {
				expect(mockedResponse.status).toHaveBeenCalledWith(
					StatusCodes.BAD_REQUEST
				);
			});

			it('should return NoDataError message', async () => {
				expect(mockedResponse.json).toHaveBeenCalledWith(
					expect.objectContaining({ error: new NoDataError().message })
				);
			});
		});
	});

export default createMultiple;
