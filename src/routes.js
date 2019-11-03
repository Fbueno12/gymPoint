import { Router } from 'express';

import sessionController from './controllers/SessionController';
import StudentsController from './controllers/StudentController';
import PlanController from './controllers/PlanController';
import RegistrationController from './controllers/RegistrationController';

import auth from './middlewares/auth';

const routes = new Router();

routes.post('/users/login', sessionController.store);

routes.use(auth);
routes.post('/students/create', StudentsController.store);
routes.put('/students/update/:id', StudentsController.update);

routes.post('/plans/create', PlanController.store);
routes.get('/plans/list', PlanController.index);
routes.put('/plans/update/:id', PlanController.update);
routes.delete('/plans/delete/:id', PlanController.delete);

routes.post('/registrations/create/:plan_id', RegistrationController.store);
routes.get('/registrations/list', RegistrationController.index);

export default routes;
