const Template = require('../models/Template');
const Category = require('../models/Category');

module.exports = {
  async list(req, res) {
    const { client_id } = req.body;

    const { count, _templates } = await Template.findAndCountAll({
      attributes: ['id', 'category_id'],
      where: { client_id },
    });

    var aux = [];

    for (let i = 0; i < _templates.length; i++) {
      var _categories = await Category.findAll({
        attributes: ['name'],
        where: { id: _templates[i].category_id },
      });

      aux.push({
        name: _categories.name,
        count,
        category_id: _templates[i].category_id,
      });
    }

    return res.json({
      error: 0,
      aux,
    });
  },

  async list_model(req, res) {
    const { client_id, category_id } = req.body;

    const _templates = await Template.findAll({
      where: { client_id, category_id },
    });

    return res.json({
      error: 0,
      _templates,
    });
  },
};
