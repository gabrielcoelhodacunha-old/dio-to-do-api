import database, { FILE_PATH } from '../../../../database';
import { deleteFile } from '../../../utils/files';
import { InvalidDataError, NoDataError } from '../../errors';
import Task from '../../entity';
import TasksService from '..';

function configureSetupAndTeardown(): void {
	beforeAll(async () => {
		await database.initialize();
	});

	afterEach(async () => {
		await database.manager.clear(Task);
	});

	afterAll(async () => {
		await database.destroy();
		deleteFile(FILE_PATH);
	});
}

export {
	TasksService,
	InvalidDataError,
	NoDataError,
	configureSetupAndTeardown,
};
