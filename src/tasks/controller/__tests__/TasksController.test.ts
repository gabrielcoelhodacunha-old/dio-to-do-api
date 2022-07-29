import create from './create';
import readById from './readById';
import readAll from './readAll';
import updateOne from './updateOne';
// import deleteOne from './deleteOne';
import deleteByIds from './deleteByIds';
// import deleteAll from './deleteAll';

jest.mock('../../service');

describe('TasksController', () => {
	create();
	readById();
	readAll();
	updateOne();
	// deleteOne();
	deleteByIds();
	// deleteAll();
});
