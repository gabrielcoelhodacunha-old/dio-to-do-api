import {
	getMockReq,
	getMockRes,
	TasksController,
	StatusCodes,
	NoDataError,
} from '.';

const readById = () =>
	describe('readById method', () => {
		describe('with id', () => {
			const taskId = 1;
			const mockedRequest = getMockReq({ params: { id: String(taskId) } });
			const { res: mockedResponse } = getMockRes({
				locals: { task: { id: taskId } },
			});

			beforeAll(async () => {
				await TasksController.readById(mockedRequest, mockedResponse);
			});

			it('should return status 200 (OK)', async () => {
				expect(mockedResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
			});

			it('should return a Task containing the id', async () => {
				expect(mockedResponse.locals.task).toMatchObject({ id: taskId });
			});
		});

		describe('without id', () => {
			const mockedRequest = getMockReq({ params: {} });
			const { res: mockedResponse } = getMockRes({ locals: {} });

			beforeAll(async () => {
				await TasksController.readById(mockedRequest, mockedResponse);
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

export default readById;
