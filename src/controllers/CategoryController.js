const Category = require('../models/Category');

module.exports = {
  async create(req, res) {
    const { name, description, thumb } = req.body;
    const exist = await Category.findOne({
      attributes: ['id'],
      where: { name },
    });
    if (!exist) {
      const new_category = await Category.create({
        name,
        description,
        thumb,
      });
      return res.json({ error: 0, id: new_category.id });
    }
    return res.json({ error: 0, id: exist.id });
  },
};
