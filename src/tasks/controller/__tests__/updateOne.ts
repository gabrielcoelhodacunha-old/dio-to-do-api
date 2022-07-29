import {
	TasksController,
	NoDataError,
	getMockReq,
	getMockRes,
	StatusCodes,
} from '.';

const updateOne = () =>
	describe('updateOne method', () => {
		describe('with id and properties to update', () => {
			const taskId = String(1);
			const taskUpdates = { isDone: true };
			const updatedTask = { ...taskUpdates, id: taskId };
			const mockedRequest = getMockReq({
				params: { id: taskId },
				body: { taskData: taskUpdates },
			});
			const { res: mockedResponse } = getMockRes({
				locals: { task: updatedTask },
			});

			beforeAll(async () => {
				await TasksController.updateOne(mockedRequest, mockedResponse);
			});

			it('should return status 200 (OK)', async () => {
				expect(mockedResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
			});

			it('should return the updated Task', async () => {
				expect(mockedResponse.locals.task).toMatchObject(updatedTask);
			});
		});

		describe('without id', () => {
			const taskUpdates = { isDone: true };
			const mockedRequest = getMockReq({
				params: {},
				body: { taskData: taskUpdates },
			});
			const { res: mockedResponse } = getMockRes({
				locals: {},
			});

			beforeAll(async () => {
				await TasksController.updateOne(mockedRequest, mockedResponse);
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

		describe('without taskData to update', () => {
			const taskId = String(1);
			const mockedRequest = getMockReq({
				params: { id: taskId },
				body: {},
			});
			const { res: mockedResponse } = getMockRes({
				locals: {},
			});

			beforeAll(async () => {
				await TasksController.updateOne(mockedRequest, mockedResponse);
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

export default updateOne;
