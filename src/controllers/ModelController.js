const Template = require('../models/Template');
const Client = require('../models/Client');
const Category = require('../models/Category');
const fs = require('fs');

const md5 = require('md5');

module.exports = {
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

    const _templates = await Template.findAll({
      where: { client_id, category_id },
      attributes: ['id', 'name_model', 'token'],
      include: [
        {
          attributes: ['name'],
          association: 'category',
        },
      ],
    });

    return res.json({
      error: 0,
      _templates,
    });
  },

  async list_model_recent(req, res) {
    const { token } = req.body;

    const clients = await Client.findAll({
      attributes: ['id'],
    });
    var client_id = 0;

    for (let i = 0; i < clients.length; i++) {
      if (md5(clients[i].id) == token) {
        client_id = clients[i].id;
      }
    }

    const _templates = await Template.findAll({
      attributes: ['id', 'name_model', 'token'],
      include: [
        {
          attributes: ['name'],
          association: 'category',
        },
      ],
      where: { client_id },
    });

    var _categories = await Category.findAll({
      attributes: ['id', 'name'],
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
      _templates,
      _categories,
    });
  },

  async getModel(req, res) {
    const { token } = req.body;

    const model = await Template.findOne({
      attributes: ['link', 'file_model', 'token'],
      where: { token },
    });

    return res.json({
      error: 0,
      model,
    });
  },

  async getModels(req, res) {
    const { token } = req.body;

    const model = await Template.findOne({
      attributes: ['category_id', 'file_model'],
      where: { token },
    });

    const models = await Template.findAll({
      attributes: ['file_model', 'name_model', 'price'],
      where: { category_id: model.category_id },
    });

    return res.json({
      error: 0,
      model,
      models,
    });
  },

  async getModelEdit(req, res) {
    const { token } = req.body;

    const _template = await Template.findOne({
      attributes: [
        'file_model',
        'description_model',
        'price',
        'name_model',
        'dim_x',
        'dim_y',
        'thumb_model',
        'dim_z',
        'category_id',
      ],
      where: { token },
    });

    return res.json({
      error: 0,
      _template,
    });
  },

  async createModel(req, res) {
    const {
      name_model,
      dim_x,
      dim_y,
      dim_z,
      price,
      description_model,
      category_id,
      token,
    } = req.body;

    console.log('Request Create');

    const clients = await Client.findAll({
      attributes: ['id'],
    });

    var client_id = 0;

    for (let i = 0; i < clients.length; i++) {
      if (md5(clients[i].id) == token) {
        client_id = clients[i].id;
      }
    }

    const { location: url = null } = req.file;

    const new_template = await Template.create({
      name_model,
      file_model: url,
      dim_x,
      dim_y,
      dim_z,
      price,
      description_model,
      thumb_model: '',
      category_id,
      client_id,
      link: '',
      token: '',
    });
    await Template.update(
      {
        token: md5(new_template.id),
      },
      { where: { id: new_template.id } }
    );
    const model = await Template.findOne({
      attributes: ['token'],
      where: { id: new_template.id },
    });

    return res.json({
      error: 0,
      id: new_template.id,
      token: model.token,
      category_id,
    });
  },

  async editModel(req, res) {
    const {
      model_token,
      name_model,
      dim_x,
      dim_y,
      dim_z,
      price,
      description_model,
      category_id,
    } = req.body;

    const { location: url = null } = req.file;

    await Template.update(
      {
        name_model,
        file_model: url,
        dim_x,
        dim_y,
        dim_z,
        price,
        description_model,
        category_id,
      },
      { where: { token: model_token } }
    );

    return res.json({ error: 0, token: model_token });
  },

  async editNoFile(req, res) {
    const {
      model_token,
      name_model,
      dim_x,
      dim_y,
      dim_z,
      price,
      description_model,
      category_id,
    } = req.body;

    await Template.update(
      {
        name_model,
        dim_x,
        dim_y,
        dim_z,
        price,
        description_model,
        category_id,
      },
      { where: { token: model_token } }
    );
    return res.json({ error: 0, token: model_token });
  },

  async confirm(req, res) {
    const { lvl, id, link, thumb_model, category_id, token } = req.body;

    if (lvl == 1) {
      await Template.update(
        {
          thumb_model,
        },
        { where: { token } }
      );
      return res.json({ error: 0, token, lvl });
    }
    await Template.update(
      {
        thumb_model,
        link,
      },
      { where: { id } }
    );
    return res.json({ error: 0, category_id, lvl });
  },

  async delete(req, res) {
    const { token } = req.body;

    const template = await Template.findOne({
      where: { token },
    });

    template.destroy();

    return res.json({ error: 0 });
  },
};
