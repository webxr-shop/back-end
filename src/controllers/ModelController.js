const Template = require('../models/Template');
const Client = require('../models/Client');
const Category = require('../models/Category');
const md5 = require('md5');

module.exports = {
  async list(req, res) {
    const { token } = req.body;

    var aux = [];
    const clients = await Client.findAll({});
    var client_id = 0;

    for (let i = 0; i < clients.length; i++) {
      if (md5(clients[i].id) == token) {
        client_id = clients[i].id;
      }
    }
    var _categories = await Category.findAll({
      attributes: ['id', 'name', 'thumb'],
      where: { client_id: client_id },
      include: [
        {
          attributes: ['category_id'],
          association: 'templates',
          group: ['category_id'],
        },
      ],
    });

    return res.json({
      error: 0,
      _categories,
    });
  },

  async list_categories(req, res) {
    const { token } = req.body;

    const clients = await Client.findAll({});
    var client_id = 0;

    for (let i = 0; i < clients.length; i++) {
      if (md5(clients[i].id) == token) {
        client_id = clients[i].id;
      }
    }
    var _categories = await Category.findAll({
      attributes: ['id', 'name'],
      where: { client_id: client_id },
    });

    return res.json({
      error: 0,
      _categories,
    });
  },

  async list_model(req, res) {
    const { token, category_id } = req.body;

    const clients = await Client.findAll({
      attributes: ['id'],
    });
    var client_id = 0;

    for (let i = 0; i < clients.length; i++) {
      if (md5(clients[i].id) == token) {
        client_id = clients[i].id;
      }
    }
    console.log(client_id);
    console.log(category_id);

    const _templates = await Template.findAll({
      where: { client_id, category_id },
    });

    return res.json({
      error: 0,
      _templates,
    });
  },

  async getModel(req, res) {
    const { model_id } = req.body;

    const _template = await Template.findOne({
      attributes: ['category_id', 'dim_x', 'dim_y', 'dim_z', 'name_model'],
      where: { id: model_id },
    });

    return res.json({
      error: 0,
      _template,
    });
  },

  async createModel(req, res) {
    const {
      name_model,
      file_model,
      dim_x,
      dim_y,
      dim_z,
      name_product,
      description_product,
      thumb_product,
      category_id,
      token,
    } = req.body;

    const clients = await Client.findAll({
      attributes: ['id'],
    });
    var client_id = 0;

    for (let i = 0; i < clients.length; i++) {
      if (md5(clients[i].id) == token) {
        client_id = clients[i].id;
      }
    }

    const new_template = await Template.create({
      name_model,
      file_model,
      dim_x,
      dim_y,
      dim_z,
      name_product,
      description_product,
      thumb_product,
      category_id,
      client_id,
      link: '',
    });
    console.log('new_template');
    console.log(new_template);
    return res.json({ error: 0, id: new_template.id });
  },

  async editModel(req, res) {
    const { model_id, name_model, dim_x, dim_y, dim_z } = req.body;

    const template = await Template.update(
      {
        name_model,
        file_model,
        dim_x,
        dim_y,
        dim_z,
        link: '',
      },
      { where: { id: model_id } }
    );
    return res.json({ error: 0, id: template.id });
  },

  async delete(req, res) {
    const { model_id } = req.body;

    const template = await Template.findOne({
      id: model_id,
    });
    template.destroy();

    return res.json({ error: 0 });
  },
};
