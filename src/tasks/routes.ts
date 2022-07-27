import { Router } from 'express';
import TasksController from './controller';

function createTasksRouter(): Router {
	const router = Router();

	router.post('/tasks/multiple', TasksController.createMultiple);
	router.post('/tasks', TasksController.createOne);
	router.get('/tasks/:id', TasksController.readOne);
	router.get('/tasks', TasksController.readAll);
	router.patch('/tasks/:id', TasksController.updateOne);
	router.delete('/tasks/:id', TasksController.deleteOne);
	// router.delete('/tasks/multiple', TasksController.deleteMultiple);
	router.delete('/tasks', TasksController.deleteAll);

	return router;
}

export default createTasksRouter;
