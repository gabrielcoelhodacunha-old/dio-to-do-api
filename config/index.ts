import dotenv from 'dotenv';
import path from 'path';
import { TEnv } from '@types';

readDotEnvAndSetVariables();
const env = createEnvForApp('TO_DO');

function readDotEnvAndSetVariables() {
	dotenv.config({
		path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
	});
}

function createEnvForApp(appName: string): TEnv {
	const env: TEnv = {} as TEnv;

	Object.entries(process.env)
		.filter(([key, _]) => key.startsWith(appName))
		.forEach(([key, value]) => {
			const [_, variable] = key.split('-');
			env[variable] = value;
		});

	return env;
}

export default env;
