import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { Order } from '../interfaces/interface';

class OrderModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public getAll = async (): Promise<Order[]> => {
    const query = 'SELECT * FROM Trybesmith.Orders;';
    const [products] = await this.connection.execute<RowDataPacket[]>(query);
    return products as Order[];
  };

  public create = async (userId: number): Promise<number> => {
    const query = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?)';
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(query, [userId]);
    return insertId;
  };
}

export default OrderModel;