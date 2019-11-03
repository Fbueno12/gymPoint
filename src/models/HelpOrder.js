import Sequelize, { Model } from 'sequelize';
import * as Yup from 'yup';

class HelpOrder extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
        question: Sequelize.STRING,
        answer: Sequelize.STRING,
        answered_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }

  static validateSchema() {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });
    return schema;
  }
}

export default HelpOrder;
