const Template = require('../models/Template');
const Client = require('../models/Client');
const Category = require('../models/Category');
const fs = require('fs');

const md5 = require('md5');

module.exports = {
  async list(req, res) {
    const _templates = await Template.findAll({
      attributes: ['id', 'name_model', 'token', 'thumb_model', 'price'],
    });

    return res.json({
      error: 0,
      _templates,
    });
  },

  async getModel(req, res) {
    const { token } = req.body;
    const model = await Template.findOne({
      where: { token },
      attributes: [
        'id',
        'name_model',
        'dim_x',
        'dim_y',
        'dim_z',
        'token',
        'description_model',
        'thumb_model',
        'price',
      ],
    });

    return res.json({
      error: 0,
      model,
    });
  },
};
