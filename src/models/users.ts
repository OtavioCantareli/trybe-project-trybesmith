import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { User } from '../interfaces/interface';

class UserModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public findOne = async (username: string): Promise<User> => {
    const [[person]] = await this.connection.execute<RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Users WHERE username = ?',
      [username],
    );
    return person as User;
  };

  public create = async (user: User): Promise<User> => {
    const { username, classe, level, password } = user;
    const values = [username, classe, level, password];
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      `INSERT INTO Trybesmith.Users (username, classe, level, password)
    VALUES (?, ?, ?, ?)`,
      values,
    );
    return { id: insertId, username, classe, level };
  };
}

export default UserModel;
