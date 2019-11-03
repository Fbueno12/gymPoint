import { Router } from 'express';

import sessionController from './controllers/SessionController';
import StudentsController from './controllers/StudentController';
import PlanController from './controllers/PlanController';
import RegistrationController from './controllers/RegistrationController';
import CheckinController from './controllers/CheckinController';
import HelpOrderController from './controllers/HelpOrderController';

import auth from './middlewares/auth';

const routes = new Router();

routes.post('/users/login', sessionController.store);

routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:student_id/help-orders', HelpOrderController.store);

routes.use(auth);
routes.post('/students/create', StudentsController.store);
routes.put('/students/update/:id', StudentsController.update);

routes.get('/plans/list', PlanController.index);
routes.post('/plans/create', PlanController.store);
routes.put('/plans/update/:id', PlanController.update);
routes.delete('/plans/delete/:id', PlanController.delete);

routes.get('/registrations/list', RegistrationController.index);
routes.post('/registrations/create/:plan_id', RegistrationController.store);
routes.put('/registrations/update/:id', RegistrationController.update);
routes.delete('/registrations/delete/:id', RegistrationController.delete);

routes.get('/students/help-orders', HelpOrderController.index);
routes.get('/students/:student_id/help-orders', HelpOrderController.show);
routes.put('/help-orders/:order_id/answer', HelpOrderController.update);

export default routes;
