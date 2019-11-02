import { Router } from 'express';

import sessionController from './controllers/SessionController';
import StudentsController from './controllers/StudentController';
import PlanController from './controllers/PlanController';

import auth from './middlewares/auth';

const routes = new Router();

routes.post('/users/login', sessionController.store);

routes.use(auth);
routes.post('/students/create', StudentsController.store);
routes.put('/students/update/:id', StudentsController.update);

routes.post('/plans/create', PlanController.store);
routes.get('/plans/list', PlanController.index);

export default routes;
