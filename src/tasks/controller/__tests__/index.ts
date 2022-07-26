import { StatusCodes } from 'http-status-codes';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { InvalidDataError, NoDataError } from '../../errors';
import Task from '../../entity';
import TasksController from '..';

function configureSetupAndTeardown(): void {}

export {
	StatusCodes,
	getMockReq,
	getMockRes,
	TasksController,
	Task,
	InvalidDataError,
	NoDataError,
	configureSetupAndTeardown,
};
