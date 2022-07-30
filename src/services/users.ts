import connection from '../models/connection';
import UserModel from '../models/users';
import { User } from '../interfaces/interface';

class UserService {
  model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public findOne = async (username: string): Promise<User> => {
    const user = await this.model.findOne(username);
    return user;
  };

  public create = async (user: User): Promise<User> => {
    const newUser = await this.model.create(user);
    return newUser;
  };
}

export default UserService;
