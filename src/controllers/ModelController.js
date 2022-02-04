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

    const _template = await Template.findOne({
      attributes: ['file_model', 'link'],
      where: { token },
    });

    return res.json({
      error: 0,
      _template,
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
      file_model,
      dim_x,
      dim_y,
      dim_z,
      price,
      description_model,
      thumb_model,
      category_id,
      token,
    } = req.body;

    console.log(req.body);

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

    const new_template = await Template.create({
      name_model,
      file_model,
      dim_x,
      dim_y,
      dim_z,
      price,
      description_model,
      thumb_model,
      category_id,
      client_id,
      link: 'a',
      token: 'a',
    });

    await Template.update(
      {
        token: md5(new_template.id),
      },
      { where: { id: new_template.id } }
    );
    // let files = file_model.split('\\');
    // let file = '';
    // for (let i = 0; i < files.length; i++) {
    //   if (i == files.length - 1) {
    //     file = file + files[i];
    //   } else {
    //     file = file + files[i] + '/';
    //   }
    // }
    // console.log(file);

    // fs.renameSync(
    //   'C:/Users/Thiago/Desktop/workspace/TCC/plataforma-webxr/assets/models/chair1.glb',
    //   'C:/Users/Thiago/Documents/artest/teste.glb'
    // );
    // fs.writeFileSync('C:/Users/Thiago/Documents/artest/teste.glb', file_model);

    return res.json({
      error: 1,
      id: new_template.id,
      category_id,
    });
  },

  async editModel(req, res) {
    const {
      id,
      name_model,
      file_model,
      dim_x,
      dim_y,
      dim_z,
      price,
      description_model,
      thumb_model,
    } = req.body;

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
    const { token } = req.body;

    const template = await Template.findOne({
      where: { token },
    });
    console.log(template);

    template.destroy();

    return res.json({ error: 0 });
  },
};
