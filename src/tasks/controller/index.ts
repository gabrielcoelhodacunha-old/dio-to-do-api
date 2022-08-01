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

	async readByIds(request: Request, response: Response): Promise<Response> {
		try {
			const { ids } = request.query;
			const idsAsNumber = transformStringToNumberArray(ids as string);
			checkIfHasInvalidId(idsAsNumber);
			const tasks = await TasksService.readByIds(idsAsNumber);
			return response.status(StatusCodes.OK).json({ tasks });
		} catch (error) {
			return handleErrors(response, error);
		}
	},

	async readAll(_: Request, response: Response): Promise<Response> {
		const tasks = await TasksService.readAll();
		return response.status(StatusCodes.OK).json({ tasks });
	},

	async read(request: Request, response: Response): Promise<Response> {
		const { ids } = request.query;
		return ids
			? TasksController.readByIds(request, response)
			: TasksController.readAll(request, response);
	},

	async updateOne(request: Request, response: Response): Promise<Response> {
		try {
			const { id } = request.params;
			const { taskData } = request.body;
			const numericId = Number(id);
			if (isNaN(numericId) || !taskData) throw new NoDataError();
			await TasksService.updateOne({ ...taskData, id });
			const updatedTask = await TasksService.readByIds([numericId]);
			return response.status(StatusCodes.OK).json({ updatedTask });
		} catch (error) {
			return handleErrors(response, error);
		}
	},

	async deleteByIds(request: Request, response: Response): Promise<Response> {
		try {
			const { ids } = request.query;
			const idsAsNumber = transformStringToNumberArray(ids as string);
			checkIfHasInvalidId(idsAsNumber);
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

function transformStringToNumberArray(str: string) {
	return str.split(',').map((id) => Number(id));
}

function checkIfHasInvalidId(ids: number[]) {
	return ids.some((id) => {
		if (!id || isNaN(id)) throw new InvalidDataError();
	});
}

export default TasksController;
