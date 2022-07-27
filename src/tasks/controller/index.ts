import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TTask } from '../../../@types';
import { NoDataError } from '../errors';
import TasksService from '../service';
import handleErrors from './handleErrors';

const TasksController = {
	async createOne(request: Request, response: Response): Promise<Response> {
		try {
			const { taskData } = request.body;
			if (!taskData || !taskData.description) throw new NoDataError();
			const createdTask = await TasksService.createOne(taskData);
			return response.status(StatusCodes.CREATED).json({ createdTask });
		} catch (error) {
			return handleErrors(response, error);
		}
	},

	async createMultiple(
		request: Request,
		response: Response
	): Promise<Response> {
		try {
			const { tasks } = request.body;
			(tasks as TTask[]).some((task) => {
				if (!task.description) throw new NoDataError();
			});
			const createdTasks = await TasksService.createMultiple(tasks);
			return response.status(StatusCodes.CREATED).json({ createdTasks });
		} catch (error) {
			return handleErrors(response, error);
		}
	},

	async readOne(request: Request, response: Response): Promise<Response> {
		try {
			const { id } = request.params;
			const numericId = Number(id);
			if (isNaN(numericId)) throw new NoDataError();
			const task = await TasksService.readOne(numericId);
			return response.status(StatusCodes.OK).json({ task });
		} catch (error) {
			return handleErrors(response, error);
		}
	},

	async readAll(_: Request, response: Response): Promise<Response> {
		const tasks = await TasksService.readAll();
		return response.status(StatusCodes.OK).json({ tasks });
	},

	async deleteAll(_: Request, response: Response): Promise<Response> {
		await TasksService.deleteAll();
		return response.status(StatusCodes.NO_CONTENT).json();
	},
};

export default TasksController;
