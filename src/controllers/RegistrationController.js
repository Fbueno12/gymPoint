import { parseISO, isBefore, startOfDay, addMonths } from 'date-fns';

import Student from '../models/Student';
import Plan from '../models/Plan';
import Registration from '../models/Registration';

class RegistrationController {
  async index(req, res) {
    const { student_id } = req.headers;
    const checkStudent = await Student.findByPk(student_id);

    if (!checkStudent) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const registrations = await Registration.findAll({
      where: { student_id },
    });

    if (registrations.length === 0) {
      return res.status(204).json();
    }

    return res.json(registrations);
  }

  async store(req, res) {
    const { student_id } = req.headers;
    const { plan_id } = req.params;

    const checkStudent = await Student.findByPk(student_id);
    if (!checkStudent) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const checkPlan = await Plan.findByPk(plan_id);
    if (!checkPlan) {
      return res.status(400).json({ error: 'Plan does not Exists.' });
    }

    const { date } = req.body;

    const start_date = startOfDay(parseISO(date));

    if (isBefore(start_date, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted.' });
    }

    const end_date = addMonths(start_date, checkPlan.duration);

    const price = checkPlan.price * checkPlan.duration;

    // antes de efetuar o registo, fazer o envio de email para o aluno

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    return res.json(registration);
  }
}

export default new RegistrationController();
