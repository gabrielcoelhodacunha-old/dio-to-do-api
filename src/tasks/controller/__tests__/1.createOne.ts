import {
	TasksController,
	Task,
	getMockReq,
	getMockRes,
	StatusCodes,
	NoDataError,
} from '.';

const createOne = () =>
	describe('createOne method', () => {
		describe('with description', () => {
			const taskData = { description: 'Task' };
			const createdTask = new Task(taskData);
			const mockedRequest = getMockReq({ body: { taskData } });
			const { res: mockedResponse } = getMockRes({ locals: { createdTask } });

			beforeAll(async () => {
				await TasksController.createOne(mockedRequest, mockedResponse);
			});

			it('should return status 201 (CREATED)', async () => {
				expect(mockedResponse.status).toHaveBeenCalledWith(StatusCodes.CREATED);
			});

			it('should return createdTask', async () => {
				expect(mockedResponse.locals.createdTask).toMatchObject(createdTask);
			});
		});

		describe('without description', () => {
			const taskData = {};
			const mockedRequest = getMockReq({ body: { taskData } });
			const { res: mockedResponse } = getMockRes();

			beforeAll(async () => {
				await TasksController.createOne(mockedRequest, mockedResponse);
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

export default createOne;
