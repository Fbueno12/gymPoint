import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const schema = Plan.validateSchema();

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const plans = await Plan.create(req.body);

    return res.json(plans);
  }

  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async update(req, res) {
    const schema = Plan.validateSchema();

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const validatePlan = await Plan.findByPk(id);

    if (!validatePlan) {
      return res.status(400).json({ error: 'Plan does not exists.' });
    }

    const plan = await validatePlan.update(req.body);

    return res.json(plan);
  }
}

export default new PlanController();
