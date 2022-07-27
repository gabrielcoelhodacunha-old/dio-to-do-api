import { Router } from 'express';
import TasksController from './controller';

function createTasksRouter(): Router {
	const router = Router();

	router.post('/tasks/multiple', TasksController.createMultiple);
	router.post('/tasks', TasksController.createOne);
	router.get('/tasks/:id', TasksController.readOne);
	router.get('/tasks', TasksController.readAll);
	router.delete('/tasks', TasksController.deleteAll);

	return router;
}

export default createTasksRouter;
