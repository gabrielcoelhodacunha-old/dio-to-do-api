import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { InvalidDataError, NoDataError } from '../errors';

function handleErrors(response: Response, error: unknown) {
	if (!(error instanceof Error)) throw error;
	switch (error.constructor) {
		case NoDataError:
			return handleNoDataError(response, error);
		case InvalidDataError:
			return handleInvalidDataError(response, error);
		default:
			throw error;
	}
}

function handleNoDataError(response: Response, error: NoDataError) {
	return response
		.status(StatusCodes.BAD_REQUEST)
		.json({ error: error.message });
}

function handleInvalidDataError(response: Response, error: InvalidDataError) {
	return response
		.status(StatusCodes.BAD_REQUEST)
		.json({ error: error.message });
}

export default handleErrors;
