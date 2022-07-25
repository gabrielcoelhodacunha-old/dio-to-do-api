import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import env from '../../../config';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Tasks route', () => {
	const url = `${env.HOST}:${env.PORT}`;
	describe('/', () => {
		it('should return status 200', async () => {
			mockedAxios.get.mockResolvedValue({
				data: {
					message: 'Welcome!',
				},
				status: StatusCodes.OK,
			});
		});
	});
});
