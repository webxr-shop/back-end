const Client = require('../models/Client');
const md5 = require('md5');

module.exports = {
  async sign(req, res) {
    const { name, last_name, email, password } = req.body;
    const exist = await Client.findOne({
      attributes: ['id'],
      where: { email },
    });

    if (!exist) {
      const new_client = await Client.create({
        name,
        last_name,
        email,
        password: md5(password),
      });
      return res.json({
        error: 0,
        token: md5(new_client.id),
      });
    }
    return res.json({ error: 'Email existente' });
  },

  async login(req, res) {
    const { email, password } = req.body;
    const exist = await Client.findOne({
      attributes: ['id', 'password'],
      where: { email },
    });
    if (exist) {
      if (exist.password == md5(password)) {
        console.log(md5(exist.id));
        return res.json({ error: 0, token: md5(exist.id) });
      } else {
        return res.json({ error: 'Senha incompatível' });
      }
    }
    return res.json({ error: 'Email inexistente' });
  },
  async profile(req, res) {
    const { token } = req.body;
    const clients = await Client.findAll({});

    for (let i = 0; i < clients.length; i++) {
      if (md5(clients[i].id) == token) {
        return res.json({ error: 0, client: clients[i] });
      }
    }

    return res.json({ error: 'Usuario não encontrado' });
  },

  async editProfile(req, res) {
    const { token, name, last_name, email, password } = req.body;
    const clients = await Client.findAll({
      attributes: ['id', 'password'],
    });

    var client_id = 0;
    var pass = '';

    for (let i = 0; i < clients.length; i++) {
      if (md5(clients[i].id) == token) {
        client_id = clients[i].id;
        pass = clients[i].password;
      }
    }

    if (client_id != 0) {
      if (password == '' || password == null) {
        await Client.update(
          {
            name,
            last_name,
            email,
            password: pass,
          },
          { where: { id: client_id } }
        );
        return res.json({
          error: 0,
        });
      }

      await Client.update(
        {
          name,
          last_name,
          email,
          password: md5(password),
        },
        { where: { id: client_id } }
      );
      return res.json({
        error: 0,
      });
    }
    return res.json({ error: 'Usuario não encontrado' });
  },
};
