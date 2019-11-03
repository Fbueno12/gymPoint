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

  async index(req, res) {
    const orders = await HelpOrder.findAll({
      where: {
        answered_at: null,
      },
    });

    if (orders.length >= 0) {
      return res.status(204).json();
    }

    return res.json(orders);
  }

  async show(req, res) {
    const { student_id } = req.params;

    const orders = await HelpOrder.findAll({
      where: {
        student_id,
      },
    });

    if (orders.length === 0) {
      return res
        .status(204)
        .json({ message: "This student don't have any questions." });
    }

    return res.json(orders);
  }

  async update(req, res) {
    const { order_id } = req.params;

    const order = await HelpOrder.findByPk(order_id);

    if (!order) {
      return res.status(400).json({ error: 'Help order does not exists.' });
    }

    const { answer } = req.body;

    order.answer = answer;
    order.answered_at = new Date();

    await order.save();

    return res.json(order);
  }
}

export default new HelpOrderController();
