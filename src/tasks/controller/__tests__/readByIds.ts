import { getMockReq, getMockRes, TasksController, StatusCodes } from '.';

const readByIds = () =>
	describe('readByIds method', () => {
		describe('with one id', () => {
			const taskId = 1;
			const mockedRequest = getMockReq({ query: { ids: String(taskId) } });
			const { res: mockedResponse } = getMockRes({
				locals: { tasks: { id: taskId } },
			});

			beforeAll(async () => {
				await TasksController.readByIds(mockedRequest, mockedResponse);
			});

			it('should return status 200 (OK)', async () => {
				expect(mockedResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
			});

			it('should return a Task containing the id', async () => {
				expect(mockedResponse.locals.tasks).toMatchObject({ id: taskId });
			});
		});

		describe('with multiple ids', () => {
			const ids = [1, 2, 3];
			const mockedRequest = getMockReq({ query: { ids: ids.toString() } });
			const { res: mockedResponse } = getMockRes({
				locals: { tasks: [{ id: 1 }, { id: 2 }, { id: 3 }] },
			});

			beforeAll(async () => {
				await TasksController.readByIds(mockedRequest, mockedResponse);
			});

			it('should return status 200 (OK)', async () => {
				expect(mockedResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
			});

			it('should return multiple Tasks', async () => {
				expect(mockedResponse.locals.tasks).toHaveLength(3);
			});
		});
	});

export default readByIds;
