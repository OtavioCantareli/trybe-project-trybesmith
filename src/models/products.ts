import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { Product } from '../interfaces/interface';

class ProductModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public getAll = async (): Promise<Product[]> => {
    const [products] = await this.connection.execute(
      'SELECT * FROM Trybesmith.Products',
    );
    return products as Product[];
  };

  public create = async (product: Product): Promise<Product> => {
    const { name, amount, orderId } = product;
    let query = 'INSERT INTO Trybesmith.Products (name, amount';
    const values: Array<string | number> = [name, amount];
    if (orderId) {
      query += ', orderId) VALUES (?, ?, ?);';
      values.push(orderId);
    } else query += ') VALUES (?, ?);';
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      query,
      values,
    );
    return { id: insertId, ...product };
  };

  public update = async (id: number, orderId: number): Promise<void> => {
    await this.connection.execute(
      'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
      [orderId, id],
    );
  };

  public findOrderById = async (id: number): Promise<number[]> => {
    const [products] = await this.connection.execute<RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Products WHERE orderId = ?',
      [id],
    );
    const ids = products.map((prod) => prod.id);
    return ids as number[];
  };
}

export default ProductModel;
