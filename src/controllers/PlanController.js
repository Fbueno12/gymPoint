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

  async delete(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({
        error: 'Plan does not exists.',
      });
    }

    const deleted = plan.destroy();

    if (!deleted.isRejected) {
      return res.status(500).json({
        error: 'Your deletion was rejected.',
      });
    }

    return res.json({ message: 'Your deletion was performed succesfully.' });
  }
}

export default new PlanController();
