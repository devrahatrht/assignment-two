import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/users/user.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());
app.use('/api', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Assignment Two Server Running');
});

app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Route is not found',
  });
});

// global error handler

app.use((error: unknown, req: Request, res: Response) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: 'something went wrong',
    });
  }
});

export default app;
