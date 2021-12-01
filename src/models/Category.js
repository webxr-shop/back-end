const { Model, DataTypes } = require('sequelize');

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        thumb: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'categories',
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Template, {
      foreignKey: 'category_id',
      as: 'templates',
    });
  }
}

module.exports = Category;
