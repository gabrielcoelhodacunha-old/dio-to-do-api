import 'module-alias/register';
import express from 'express';
import env from '@config/';
import createRouters from './routes';

const app = express();
app.use(express.json());
app.use(createRouters());

app.listen(env.PORT, env.HOST, () => {
	console.log(`Server running on ${env.PROTOCOL}://${env.HOST}:${env.PORT}`);
});
