import Sequelize from 'sequelize';
import User from '../models/User';
import Student from '../models/Student';
import Plan from '../models/Plan';
import databaseConfig from '../config/database';

const models = [User, Student, Plan];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
