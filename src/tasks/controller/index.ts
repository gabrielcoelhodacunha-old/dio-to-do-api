import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TTask } from '../../../@types';
import { InvalidDataError, NoDataError } from '../errors';
import TasksService from '../service';
import handleErrors from './handleErrors';

const TasksController = {
	async create(request: Request, response: Response): Promise<Response> {
		try {
			const { tasks } = request.body;
			(tasks as TTask[]).some((task) => {
				if (!task.description) throw new NoDataError();
			});
			const createdTasks = await TasksService.create(tasks);
			return response.status(StatusCodes.CREATED).json({ createdTasks });
		} catch (error) {
			return handleErrors(response, error);
		}
	},

	async readById(request: Request, response: Response): Promise<Response> {
		try {
			const { id } = request.params;
			const numericId = Number(id);
			if (isNaN(numericId)) throw new NoDataError();
			const task = await TasksService.readById(numericId);
			return response.status(StatusCodes.OK).json({ task });
		} catch (error) {
			return handleErrors(response, error);
		}
	},

	async readAll(_: Request, response: Response): Promise<Response> {
		const tasks = await TasksService.readAll();
		return response.status(StatusCodes.OK).json({ tasks });
	},

	async updateOne(request: Request, response: Response): Promise<Response> {
		try {
			const { id } = request.params;
			const { taskData } = request.body;
			const numericId = Number(id);
			if (isNaN(numericId) || !taskData) throw new NoDataError();
			await TasksService.updateOne({ ...taskData, id });
			const updatedTask = await TasksService.readById(numericId);
			return response.status(StatusCodes.OK).json({ updatedTask });
		} catch (error) {
			return handleErrors(response, error);
		}
	},

	async deleteByIds(request: Request, response: Response): Promise<Response> {
		try {
			const { ids } = request.query;
			if (!ids) throw new NoDataError();
			const idsAsNumber = (ids as string).split(',').map((id) => {
				const idAsNumber = Number(id);
				if (!idAsNumber || isNaN(idAsNumber)) throw new InvalidDataError();
				return idAsNumber;
			});
			await TasksService.deleteByIds(idsAsNumber);
			return response.status(StatusCodes.NO_CONTENT).json();
		} catch (error) {
			return handleErrors(response, error);
		}
	},

	async deleteAll(_: Request, response: Response): Promise<Response> {
		await TasksService.deleteAll();
		return response.status(StatusCodes.NO_CONTENT).json();
	},

	async delete(request: Request, response: Response): Promise<Response> {
		const { ids } = request.query;
		return ids
			? TasksController.deleteByIds(request, response)
			: TasksController.deleteAll(request, response);
	},
};

export default TasksController;
