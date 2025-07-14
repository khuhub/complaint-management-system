import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import complaintsRouter from './routes/complaints';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ message: 'Server is running!' });
});

app.use('/api/complaints', complaintsRouter);
app.use('/complaints', complaintsRouter);

app.use((req, res) => {
  console.log(`404: ${req.method} ${req.url}`);
  res.status(404).json({ error: `Route ${req.url} not found` });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`\nServer running on port ${PORT}`);
});