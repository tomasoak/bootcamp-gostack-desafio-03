import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';

import authMiddleware from './app/middlewares/auth';
import adminMiddlleware from './app/middlewares/admin';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/deliveryman', DeliverymanController.store);
routes.get('/deliveryman', DeliverymanController.index);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

routes.get('/recipients', adminMiddlleware, RecipientController.index);
routes.get('/recipients/:id', adminMiddlleware, RecipientController.show);
routes.post('/recipients', adminMiddlleware, RecipientController.store);
routes.put('/recipients/:id', adminMiddlleware, RecipientController.update);
routes.delete('recipients/:id', adminMiddlleware, RecipientController.delete);

export default routes; 
