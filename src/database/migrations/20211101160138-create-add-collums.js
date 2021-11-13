'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('categories', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn('categories', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('categories', 'created_at');
    await queryInterface.removeColumn('categories', 'updated_at');
  },
};
