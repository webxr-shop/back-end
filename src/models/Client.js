const { Model, DataTypes } = require('sequelize');

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'clients',
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Template, { foreignKey: 'client_id', as: 'templates' });
  }
}

module.exports = Client;
