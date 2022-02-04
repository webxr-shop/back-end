const Category = require('../models/Category');
const Client = require('../models/Client');
const md5 = require('md5');

module.exports = {
  async create(req, res) {
    const { name, description, token } = req.body;
    const exist = await Category.findOne({
      attributes: ['id'],
      where: { name },
    });
    if (!exist) {
      const clients = await Client.findAll({});
      var client_id = 0;

      for (let i = 0; i < clients.length; i++) {
        if (md5(clients[i].id) == token) {
          client_id = clients[i].id;
        }
      }
      await Category.create({
        name,
        description,

        client_id,
      });
      return res.json({ error: 0 });
    }
    return res.json({ error: 0 });
  },
  // async list(req, res) {
  //   const { token } = req.body;
  //   const clients = await Client.findAll({});
  //   var client_id = 0;

  //   for (let i = 0; i < clients.length; i++) {
  //     if (md5(clients[i].id) == token) {
  //       client_id = clients[i].id;
  //     }
  //   }

  //   var _categories = await Category.findAll({
  //     attributes: ['id', 'name'],
  //     where: { client_id },
  //   });

  //   return res.json(_categories);
  // },

  async list(req, res) {
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
};
