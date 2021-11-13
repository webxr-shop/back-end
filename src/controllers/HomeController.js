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
        where: { id: _templates[i].category_id },
      });

      aux.push(_categories);
    }

    return res.json({
      error: 0,
      count_category: aux.length,
      count_model: count,
    });
  },
};
