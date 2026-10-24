import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import taskRoutes from './routes/task.routes.js';
import { FRONTEND_URL, NODE_ENV } from './config/index.js';

import * as dns from 'node:dns';
dns.setServers(['1.1.1.1', '1.0.0.1']); // Force Cloudflare DNS

const app = express();

app.use(helmet());
app.use(cors({ origin: FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '10kb' }));
if (NODE_ENV !== 'test') app.use(morgan('dev'));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
