const { Model, DataTypes } = require('sequelize');

class Template extends Model {
  static init(sequelize) {
    super.init(
      {
        name_model: DataTypes.STRING,
        file_model: DataTypes.STRING,
        link: DataTypes.STRING,
        price: DataTypes.DOUBLE,
        dim_x: DataTypes.DOUBLE,
        dim_y: DataTypes.DOUBLE,
        dim_z: DataTypes.DOUBLE,
        description_model: DataTypes.STRING,
        thumb_model: DataTypes.STRING,
        token: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'templates',
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: 'client_id', as: 'client' });
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    });
  }
}

module.exports = Template;
