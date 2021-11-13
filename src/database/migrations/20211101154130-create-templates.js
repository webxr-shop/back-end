'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('templates', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'clients', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name_model: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      file_model: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      link: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dim_x: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      dim_y: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      dim_z: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      name_product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description_product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      thumb_product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('templates');
  },
};
