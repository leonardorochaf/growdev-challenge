import express, { json } from 'express';
import 'reflect-metadata';
import cors from 'cors';
import rTracer from 'cls-rtracer';

import { initRoutes } from './routes/router';

const app = express();
app.use(cors());
app.use(json());
app.use(rTracer.expressMiddleware({ useHeader: true, headerName: 'X-Request-Id' }));

initRoutes(app);

export default app;
