const Client = require('../models/Client');
const md5 = require('md5');

module.exports = {
  async sign(req, res) {
    const { name, last_name, email, password } = req.body;

    try {
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

      return res.status(500).json('Email existente');
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const exist = await Client.findOne({
        attributes: ['id', 'password'],
        where: { email },
      });
      if (exist) {
        if (exist.password == md5(password)) {
          console.log(md5(exist.id));
          return res.json({ error: 0, token: md5(exist.id) });
        } else {
          return res.status(500).json('Senha incompatível');
        }
      }
      return res.status(500).json('Usuario Inexistente');
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  async profile(req, res) {
    const { token } = req.body;

    try {
      const clients = await Client.findAll({});

      for (let i = 0; i < clients.length; i++) {
        if (md5(clients[i].id) == token) {
          return res.json({ error: 0, client: clients[i] });
        }
      }
      return res.status(500).json('Usuario não encontrado');
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  async editProfile(req, res) {
    const { token, name, last_name, email, password } = req.body;

    try {
      const clients = await Client.findAll({
        attributes: ['id', 'password'],
      });

      let client_id = 0;
      let pass = '';

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
      return res.status(500).json('Usuario não encontrado');
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};
