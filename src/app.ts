import express from 'express';
import prodRouter from './routes/products';
import userRouter from './routes/users';

const app = express();

app.use(express.json());
app.use('/products', prodRouter);
app.use('/users', userRouter);

export default app;
