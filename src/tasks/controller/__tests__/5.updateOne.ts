import {
	TasksController,
	NoDataError,
	Task,
	getMockReq,
	getMockRes,
	StatusCodes,
} from '.';

const updateOne = () =>
	describe('updateOne method', () => {
		describe('with id', () => {
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

			it('should return a Task containing the id', async () => {
				expect(mockedResponse.locals.task).toMatchObject(updatedTask);
			});
		});
	});

// const updateOne = () =>
// 	describe('updateOne method', () => {
// 		it('should update the Task', async () => {
// 			const taskToUpdate = await TasksService.createOne({
// 				description: 'Task',
// 			});
// 			await TasksService.updateOne({
// 				...taskToUpdate,
// 				description: 'Updated',
// 				isDone: true,
// 			});
// 			expect(await TasksService.readOne(taskToUpdate.id)).toMatchObject({
// 				...taskToUpdate,
// 				description: 'Updated',
// 				isDone: true,
// 			});
// 		});
// 		it('should throw InvalidDataError', async () => {
// 			const fakeTask = { id: 150, description: 'Test', isDone: true };
// 			await expect(TasksService.updateOne(fakeTask)).rejects.toThrowError(
// 				InvalidDataError
// 			);
// 		});
// 	});

export default updateOne;
