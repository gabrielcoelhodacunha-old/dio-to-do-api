import { Router } from 'express';
import TasksController from './controller';

function createTasksRouter(): Router {
	const router = Router();

	router.post('/tasks', TasksController.create);
	router.get('/tasks/:id', TasksController.readById);
	router.get('/tasks', TasksController.readAll);
	router.patch('/tasks/:id', TasksController.updateOne);
	router.delete('/tasks', TasksController.delete);

	return router;
}

export default createTasksRouter;
