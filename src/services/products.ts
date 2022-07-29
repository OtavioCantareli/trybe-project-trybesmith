import connection from '../models/connection';
import { Product } from '../interfaces/interface';
import ProductModel from '../models/products';

class ProductService {
  private model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public getAll = async (): Promise<Product[]> => {
    const products = await this.model.getAll();
    return products;
  };

  public create = async (prod: Product): Promise<Product> => {
    const product = await this.model.create(prod);
    return product;
  };
}

export default ProductService;
