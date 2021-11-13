const Template = require('../models/Template');

module.exports = {
  async create(req, res) {
    const { name_model, file_model, dim_x, dim_y, dim_z } = req.body;

    const new_template = await Template.create({
      name_model,
      file_model,
      dim_x,
      dim_y,
      dim_z,
    });
    return res.json({ error: 0, id: new_template.id });
  },
};
