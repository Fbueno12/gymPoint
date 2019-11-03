import { startOfDay, subDays, endOfDay } from 'date-fns';

import { Op } from 'sequelize';
import Student from '../models/Student';
import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const { id } = req.params;

    const checkins = await Checkin.findAll({ where: { student_id: id } });

    return res.json(checkins);
  }

  async store(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const pastDays = startOfDay(subDays(new Date(), 7));
    const today = endOfDay(new Date());

    const checkCheckin = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: {
          [Op.between]: [pastDays, today],
        },
      },
    });

    if (checkCheckin.length >= 5) {
      return res.status(400).json({
        error: 'You have reached the maximum amount of checkins this week.',
      });
    }

    const checkin = await Checkin.create({
      student_id: id,
    });

    return res.json(checkin);
  }
}
export default new CheckinController();
