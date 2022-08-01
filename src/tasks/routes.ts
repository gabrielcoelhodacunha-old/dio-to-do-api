import { Router } from 'express';
import TasksController from './controller';

function createTasksRouter(): Router {
	const router = Router();

	router.post('/tasks', TasksController.create);
	router.get('/tasks', TasksController.read);
	router.patch('/tasks/:id', TasksController.updateOne);
	router.delete('/tasks', TasksController.delete);

	return router;
}

export default createTasksRouter;
