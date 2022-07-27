import createOne from './1.createOne';
import createMultiple from './2.createMultiple';
import readOne from './3.readOne';
import readAll from './4.readAll';
import updateOne from './5.updateOne';
import deleteOne from './6.deleteOne';
import deleteMultiple from './7.deleteMultiple';
import deleteAll from './8.deleteAll';

jest.mock('../../service');

describe('TasksController', () => {
	createOne();
	createMultiple();
	readOne();
	readAll();
	updateOne();
	deleteOne();
	deleteMultiple();
	deleteAll();
});
