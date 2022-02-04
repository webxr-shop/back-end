'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('categories', 'thumb');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('categories', 'thumb', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
