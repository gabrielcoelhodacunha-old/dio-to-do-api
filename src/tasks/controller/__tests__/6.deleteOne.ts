import {
	TasksController,
	NoDataError,
	getMockReq,
	getMockRes,
	StatusCodes,
} from '.';

const deleteOne = () =>
	describe('deleteOne method', () => {
		describe('with id', () => {
			const taskId = String(1);
			const mockedRequest = getMockReq({ params: { id: taskId } });
			const { res: mockedResponse } = getMockRes();

			beforeAll(async () => {
				await TasksController.deleteOne(mockedRequest, mockedResponse);
			});

			it('should return status 204 (NO_CONTENT)', async () => {
				expect(mockedResponse.status).toHaveBeenCalledWith(
					StatusCodes.NO_CONTENT
				);
			});
		});

		describe('without id', () => {
			const mockedRequest = getMockReq({ params: {} });
			const { res: mockedResponse } = getMockRes();

			beforeAll(async () => {
				await TasksController.deleteOne(mockedRequest, mockedResponse);
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

export default deleteOne;
