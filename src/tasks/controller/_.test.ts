import { getMockReq, getMockRes } from '@jest-mock/express';
import { StatusCodes } from 'http-status-codes';
import TasksController from '.';
import Task from '../entity';

jest.mock('../service');

describe('TasksController', () => {
	describe('createOne method', () => {
		describe('with description', () => {
			const taskData = { description: 'Task' };
			const createdTask = new Task(taskData);
			const mockedRequest = getMockReq({ body: { taskData } });
			const { res: mockedResponse } = getMockRes({ locals: { createdTask } });

			beforeAll(async () => {
				await TasksController.createOne(mockedRequest, mockedResponse);
			});

			it('should return status 201', async () => {
				expect(mockedResponse.status).toHaveBeenCalledWith(StatusCodes.CREATED);
			});

			it('should return createdTask', async () => {
				expect(mockedResponse.locals.createdTask).toMatchObject(createdTask);
			});
		});
	});

	describe('readAll method', () => {
		describe('with Tasks in database', () => {
			const tasks = [{ id: 1 }, { id: 2 }];
			const mockedRequest = getMockReq();
			const { res: mockedResponse } = getMockRes({ locals: { tasks } });

			beforeAll(async () => {
				await TasksController.readAll(mockedRequest, mockedResponse);
			});

			it('should return status 200', async () => {
				expect(mockedResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
			});

			it('should return Tasks in database', async () => {
				expect(mockedResponse.locals.tasks).toMatchObject(tasks);
			});
		});

		describe('with no Tasks in database', () => {
			const tasks: Task[] = [];
			const mockedRequest = getMockReq();
			const { res: mockedResponse } = getMockRes({ locals: { tasks } });

			beforeAll(async () => {
				await TasksController.readAll(mockedRequest, mockedResponse);
			});

			it('should return status 200', async () => {
				expect(mockedResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
			});

			it('should return empty array', async () => {
				expect(mockedResponse.locals.tasks).toHaveLength(0);
			});
		});
	});
});
