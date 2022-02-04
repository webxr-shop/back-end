'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      'templates',
      'description_product',
      'description_model'
    );
    await queryInterface.renameColumn(
      'templates',
      'thumb_product',
      'thumb_model'
    );
    await queryInterface.removeColumn('templates', 'name_product');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('templates', 'name_product', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
