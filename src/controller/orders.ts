import { Request, Response } from 'express';
import OrderService from '../services/orders';
import { ReqUser } from '../interfaces/interface';

class OrderController {
  private service: OrderService;

  constructor() {
    this.service = new OrderService();
  }

  public getAll = async (req: Request, res: Response) => {
    const orders = await this.service.getAll();
    res.status(200).json(orders);
  };

  public create = async (req: ReqUser, res: Response) => {
    let id;
    if (req.user) {
      id = req.user.id;
    }
    const { productsIds } = req.body;
    let orders;
    if (id) {
      orders = await this.service.create(id, productsIds);
    }
    res.status(201).json(orders);
  };
}

export default OrderController;