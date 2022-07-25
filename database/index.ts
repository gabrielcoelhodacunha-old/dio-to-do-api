import { DataSource } from 'typeorm';
import env from '../config';
import Task from '../src/tasks/entity';

export const FILE_PATH = `database/${env.NODE_ENV}.db`;

const database = createDatabase();

export function createDatabase(filePath = FILE_PATH) {
	return new DataSource({
		type: 'sqlite',
		database: filePath,
		synchronize: true,
		logging: false,
		entities: [Task],
		subscribers: [],
		migrations: [],
	});
}

export default database;
