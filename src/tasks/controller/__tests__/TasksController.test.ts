import createOne from './1.createOne';
import createMultiple from './2.createMultiple';
import readAll from './4.readAll';
import deleteAll from './8.deleteAll';

jest.mock('../../service');

describe('TasksController', () => {
	createOne();
	createMultiple();
	readAll();
	deleteAll();
});
