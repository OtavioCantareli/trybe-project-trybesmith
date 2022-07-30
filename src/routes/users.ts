import { Router } from 'express';
import UserController from '../controller/users';

const controller = new UserController();

const router = Router();

router.route('/').post(controller.create);

export default router;
