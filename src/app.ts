import express from 'express';
import prodRouter from './routes/products';
import userRouter from './routes/users';
import orderRouter from './routes/orders';

const app = express();

app.use(express.json());
app.use('/products', prodRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);

export default app;
