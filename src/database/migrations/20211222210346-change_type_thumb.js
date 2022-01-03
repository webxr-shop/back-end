'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('categories', 'thumb', {
        type: Sequelize.TEXT,
        allowNull: false,
      }),
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([queryInterface.changeColumn('categories', 'thumb')]);
  },
};
