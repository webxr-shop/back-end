'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('categories', 'client_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'clients', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('categories', 'client_id');
  },
};
