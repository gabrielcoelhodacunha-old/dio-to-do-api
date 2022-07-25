import { Router } from 'express';
import createTasksRouter from './tasks/routes';

function createRouters(): Router[] {
	return [createTasksRouter()];
}

export default createRouters;
