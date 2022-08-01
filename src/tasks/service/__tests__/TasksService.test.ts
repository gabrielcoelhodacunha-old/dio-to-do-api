import { configureSetupAndTeardown } from '.';
import create from './create';
import readByIds from './readByIds';
import readAll from './readAll';
import updateOne from './updateOne';
import deleteByIds from './deleteByIds';
import deleteAll from './deleteAll';

describe('TasksService', () => {
	configureSetupAndTeardown();
	create();
	readByIds();
	readAll();
	updateOne();
	deleteByIds();
	deleteAll();
});
