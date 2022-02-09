const Template = require('../models/Template');
const Category = require('../models/Category');

module.exports = {
  async list(req, res) {
    const { token } = req.body;

    try {
      const clients = await Client.findAll({
        attributes: ['id'],
      });
      let client_id = 0;

      for (let i = 0; i < clients.length; i++) {
        if (md5(clients[i].id) == token) {
          client_id = clients[i].id;
        }
      }

      const _templates = await Template.findAll({
        attributes: ['name', 'id'],
        where: { client_id },
        limit: 10,
        order: 'DESC',
      });

      return res.json({
        error: 0,
        _templates,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};
