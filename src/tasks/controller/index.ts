import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NoDataError } from '../errors';
import TasksService from '../service';

const TasksController = {
	async createOne(request: Request, response: Response): Promise<Response> {
		const { taskData } = request.body;
		if (!taskData || !taskData.description) throw new NoDataError();
		const createdTask = await TasksService.createOne(taskData);
		return response.status(StatusCodes.CREATED).json({ createdTask });
	},

	async readAll(_: Request, response: Response): Promise<Response> {
		const tasks = await TasksService.readAll();
		return response.status(StatusCodes.OK).json({ tasks });
	},
};

export default TasksController;
