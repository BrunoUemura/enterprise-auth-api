import '@src/config/env-config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from '@src/application/routes';
import errorHandler from '@src/util/error-handler';

const app = express();

app.use(
  cors({
    origin: `${process.env.GATEWAY_URL}`,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(routes);
app.use(errorHandler);

export default app;
