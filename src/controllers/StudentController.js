import * as Yup from 'yup';
import Student from '../models/Student';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .positive()
        .required(),
      weight: Yup.number()
        .positive()
        .required(),
      heigth: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, email } = req.body;

    const student = await Student.findOne({ where: { email } });

    if (student) {
      return res.status(401).json({ error: 'Student already exists.' });
    }

    const { id } = Student.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .positive()
        .required(),
      weight: Yup.number()
        .positive()
        .required(),
      heigth: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { email } = req.body;

    const studentExists = await Student.findOne({ where: { id } });

    if (!studentExists) {
      return res.status(400).json({ error: 'Students does not exists.' });
    }

    const checkStudents = await Student.findOne({ where: { email } });
    const checkUsers = await User.findOne({ where: { email } });

    if (!checkStudents || checkUsers) {
      return res.status(400).json({ error: 'Email has already been taken.' });
    }
    const student = await Student.findByPk(id);
    const { name, age, weight, heigth } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      heigth,
    });
  }
}

export default new SessionController();
