import { Order } from '../interfaces/interface';
import connection from '../models/connection';
import OrderModel from '../models/orders';
import ProductModel from '../models/products';

class OrderService {
  private model: OrderModel;

  private productModel: ProductModel;

  constructor() {
    this.model = new OrderModel(connection);
    this.productModel = new ProductModel(connection);
  }

  public getAll = async (): Promise<Order[]> => {
    const orders = await this.model.getAll();
    const prodIds = await Promise.all(orders.map((order: Order) => {
      let ids;
      if (order.id) {
        ids = this.productModel.findOrderById(order.id);
      }
      return ids;
    }));
    orders.forEach((_order, index) => { orders[index].productsIds = prodIds[index]; });
    return orders;
  };

  public create = async (userId: number, productsIds: Array<number>): Promise<Order> => {
    const orderId = await this.model.create(userId);
    const ids = await Promise.all(productsIds.map((id) => {
      this.productModel.update(id, orderId);
      return id;
    }));
    return { userId, productsIds: ids };
  };
}

export default OrderService;