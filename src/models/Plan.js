import Sequelize, { Model } from 'sequelize';
import * as Yup from 'yup';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.NUMBER,
        price: Sequelize.NUMBER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static validateSchema() {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .positive()
        .required(),
      price: Yup.number()
        .positive()
        .required(),
    });
    return schema;
  }
}

export default Plan;
