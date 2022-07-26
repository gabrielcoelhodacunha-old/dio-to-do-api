import { Router } from 'express';
import TasksController from './controller';

function createTasksRouter(): Router {
	const router = Router();

	router.get('/tasks', TasksController.readAll);

	return router;
}

export default createTasksRouter;
