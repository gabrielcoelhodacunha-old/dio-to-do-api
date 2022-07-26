import { getMockReq, getMockRes, StatusCodes, TasksController } from '.';

const deleteAll = () =>
	describe('deleteAll method', () => {
		const mockedRequest = getMockReq();
		const { res: mockedResponse } = getMockRes();

		beforeAll(async () => {
			await TasksController.deleteAll(mockedRequest, mockedResponse);
		});

		it('should return status 204 (NO_CONTENT)', async () => {
			expect(mockedResponse.status).toHaveBeenCalledWith(
				StatusCodes.NO_CONTENT
			);
		});
	});

export default deleteAll;
