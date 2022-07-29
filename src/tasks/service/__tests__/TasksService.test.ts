import { configureSetupAndTeardown } from '.';
import create from './create';
import readById from './readById';
import readAll from './readAll';
import updateOne from './updateOne';
import deleteByIds from './deleteByIds';
import deleteAll from './deleteAll';

describe('TasksService', () => {
	configureSetupAndTeardown();
	create();
	readById();
	readAll();
	updateOne();
	deleteByIds();
	deleteAll();
});
