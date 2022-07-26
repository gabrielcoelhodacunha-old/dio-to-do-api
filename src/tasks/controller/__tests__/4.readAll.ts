import { getMockReq, getMockRes, TasksController, StatusCodes, Task } from '.';

const readAll = () =>
	describe('readAll method', () => {
		describe('with Tasks in database', () => {
			const tasks = [{ id: 1 }, { id: 2 }];
			const mockedRequest = getMockReq();
			const { res: mockedResponse } = getMockRes({ locals: { tasks } });

			beforeAll(async () => {
				await TasksController.readAll(mockedRequest, mockedResponse);
			});

			it('should return status 200 (OK)', async () => {
				expect(mockedResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
			});

			it('should return Tasks in database', async () => {
				expect(mockedResponse.locals.tasks).toMatchObject(tasks);
			});
		});

		describe('without Tasks in database', () => {
			const tasks: Task[] = [];
			const mockedRequest = getMockReq();
			const { res: mockedResponse } = getMockRes({ locals: { tasks } });

			beforeAll(async () => {
				await TasksController.readAll(mockedRequest, mockedResponse);
			});

			it('should return status 200 (OK)', async () => {
				expect(mockedResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
			});

			it('should return empty array', async () => {
				expect(mockedResponse.locals.tasks).toHaveLength(0);
			});
		});
	});

export default readAll;
