import { TasksController, getMockReq, getMockRes, StatusCodes } from '.';

const deleteByIds = () =>
	describe('deleteByIds method', () => {
		describe('with only one id and', () => {
			describe('the id is valid', () => {
				const ids = String(1);
				const mockedRequest = getMockReq({ query: { ids } });
				const { res: mockedResponse } = getMockRes();

				beforeAll(async () => {
					await TasksController.deleteByIds(mockedRequest, mockedResponse);
				});

				it('should return status 204 (NO_CONTENT)', async () => {
					expect(mockedResponse.status).toHaveBeenCalledWith(
						StatusCodes.NO_CONTENT
					);
				});
			});

			describe('the id is not valid', () => {
				const ids = 'abc';
				const mockedRequest = getMockReq({ query: { ids } });
				const { res: mockedResponse } = getMockRes();

				beforeAll(async () => {
					await TasksController.deleteByIds(mockedRequest, mockedResponse);
				});

				it('should return status 400 (BAD_REQUEST)', async () => {
					expect(mockedResponse.status).toHaveBeenCalledWith(
						StatusCodes.BAD_REQUEST
					);
				});
			});
		});

		describe('with multiple ids and', () => {
			describe('all ids are valid', () => {
				const ID_COUNT = 5;
				const tasksIds: Number[] = [];
				for (let ID = 1; ID < ID_COUNT; ID++) {
					tasksIds.push(ID);
				}
				const mockedRequest = getMockReq({
					query: { ids: tasksIds.toString() },
				});
				const { res: mockedResponse } = getMockRes();

				beforeAll(async () => {
					await TasksController.deleteByIds(mockedRequest, mockedResponse);
				});

				it('should return status 204 (NO_CONTENT)', async () => {
					expect(mockedResponse.status).toHaveBeenCalledWith(
						StatusCodes.NO_CONTENT
					);
				});
			});

			describe('some ids are not valid', () => {
				const tasksIds = '1,2,a,3,b,4';
				const mockedRequest = getMockReq({ query: { ids: tasksIds } });
				const { res: mockedResponse } = getMockRes();

				beforeAll(async () => {
					await TasksController.deleteByIds(mockedRequest, mockedResponse);
				});

				it('should return status 400 (BAD_REQUEST)', async () => {
					expect(mockedResponse.status).toHaveBeenCalledWith(
						StatusCodes.BAD_REQUEST
					);
				});
			});
		});
	});

export default deleteByIds;
