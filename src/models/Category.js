const { Model, DataTypes } = require('sequelize');

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        thumb: DataTypes.TEXT,
      },
      {
        sequelize,
        tableName: 'categories',
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: 'client_id', as: 'client' });
    this.hasMany(models.Template, {
      foreignKey: 'category_id',
      as: 'templates',
    });
  }
}

module.exports = Category;
