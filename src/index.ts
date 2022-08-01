import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import env from '../config';
import database from '../database';
import createRouters from './routes';

database.initialize().then(() => {
	const app = express();
	app.use(cors());
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());
	app.use(createRouters());

	app.listen(env.PORT, env.HOST, () => {
		console.log(`Server running on ${env.PROTOCOL}://${env.HOST}:${env.PORT}`);
	});
});
