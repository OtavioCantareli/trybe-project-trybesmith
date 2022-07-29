import { Request, Response } from 'express';
import ProductService from '../services/products';

class ProductController {
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.service.getAll();
    res.status(200).json(products);
  };

  public create = async (req: Request, res: Response) => {
    const product = await this.service.create(req.body);
    res.status(201).json(product);
  };
}

export default ProductController;
