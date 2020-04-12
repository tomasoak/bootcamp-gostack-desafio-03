import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import PackageController from './app/controllers/PackageController';

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
routes.delete('/users/:id', UserController.delete);

routes.post('/files', upload.single('file'), FileController.store);

// CRUD for Packages - for deliveryman
routes.get('/deliveryman/:id/to-delivery', PackageController.index);
routes.get('/deliveryman/:id/delivered', PackageController.show);
// Update delivery, withdraw or finish
routes.put('/deliveryman/:id/deliveries/:deliveryId', PackageController.update);
//routes.put('/deliveryman/:id/deliveries/:deliveryId/finish', FinishController.update);

// CRUD For Deliveryman - for admin
routes.post('/deliveryman',adminMiddlleware, DeliverymanController.store);
routes.get('/deliveryman', adminMiddlleware, DeliverymanController.index);
routes.put('/deliveryman/:id', adminMiddlleware, DeliverymanController.update);
routes.delete('/deliveryman/:id', adminMiddlleware, DeliverymanController.delete);

// CRUD For Delivery - for admin
routes.post('/delivery', adminMiddlleware, DeliveryController.store);
routes.get('/delivery', adminMiddlleware, DeliveryController.index);
routes.get('/delivery/:id', adminMiddlleware, DeliveryController.show);
routes.put('/delivery/:id', adminMiddlleware, DeliveryController.update);
routes.delete('/delivery/:id', adminMiddlleware, DeliveryController.delete);

// CRUD For Recipients - for admin
routes.get('/recipients', adminMiddlleware, RecipientController.index);
routes.get('/recipients/:id', adminMiddlleware, RecipientController.show);
routes.post('/recipients', adminMiddlleware, RecipientController.store);
routes.put('/recipients/:id', adminMiddlleware, RecipientController.update);
routes.delete('recipients/:id', adminMiddlleware, RecipientController.delete);

export default routes; 
