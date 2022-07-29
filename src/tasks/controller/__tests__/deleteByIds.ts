import {
	TasksController,
	NoDataError,
	getMockReq,
	getMockRes,
	StatusCodes,
} from '.';

const deleteByIds = () =>
	describe('deleteByIds method', () => {
		describe('with only one id and', () => {
				describe('with id', () => {
					const taskId = String(1);
					const mockedRequest = getMockReq({ params: { ids: [taskId] } });
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
		
				describe('without id', () => {
					const mockedRequest = getMockReq({ params: {} });
					const { res: mockedResponse } = getMockRes();
		
					beforeAll(async () => {
						await TasksController.deleteByIds(mockedRequest, mockedResponse);
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
		})

		describe('with ids', () => {
			const ID_COUNT = 5;
			const tasksIds: Number[] = [];
			for (let ID = 1; ID < ID_COUNT; ID++) {
				tasksIds.push(ID);
			}
			const mockedRequest = getMockReq({ body: { ids: tasksIds } });
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

		describe('without ids', () => {
			const mockedRequest = getMockReq({ body: {} });
			const { res: mockedResponse } = getMockRes();

			beforeAll(async () => {
				await TasksController.deleteByIds(mockedRequest, mockedResponse);
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

export default deleteByIds;
