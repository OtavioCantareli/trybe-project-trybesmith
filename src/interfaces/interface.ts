import { Request } from 'express';

export interface Product {
  id?: number;
  name: string;
  amount: string;
  orderId?: number;
}

export interface Order {
  id?: number;
  userId: number;
  productsIds?: Array<number>;
}

export interface User {
  id?: number;
  username: string;
  classe: string;
  level: number;
  password?: string;
}

export interface ReqUser extends Request {
  user?: {
    id: number;
    username: string;
    classe: string;
    level: number;
  };
}