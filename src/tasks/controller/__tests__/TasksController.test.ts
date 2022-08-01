import create from './create';
import readByIds from './readByIds';
import readAll from './readAll';
import updateOne from './updateOne';
import deleteByIds from './deleteByIds';
import deleteAll from './deleteAll';

jest.mock('../../service');

describe('TasksController', () => {
	create();
	readByIds();
	readAll();
	updateOne();
	deleteByIds();
	deleteAll();
});
