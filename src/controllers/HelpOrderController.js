import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async store(req, res) {
    const { student_id } = req.params;

    const checkStudent = await Student.findByPk(student_id);

    if (!checkStudent) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const { question } = req.body;

    const help_order = await HelpOrder.create({
      student_id,
      question,
    });

    return res.json(help_order);
  }
}

export default new HelpOrderController();
