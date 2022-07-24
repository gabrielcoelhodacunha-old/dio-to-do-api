import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

function createTasksRouter(): Router {
	const router = Router();

	router.get('/', (_, response) => {
		return response.status(StatusCodes.OK).json({ message: 'Welcome!' });
	});

	return router;
}

export default createTasksRouter;
