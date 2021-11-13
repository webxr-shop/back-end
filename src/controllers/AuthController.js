const Client = require('../models/Client');

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
        password,
      });
      return res.json({ error: 0, id: new_client.id });
    }
    return res.json({ error: 1, erro: 'Email existente' });
  },

  async login(req, res) {
    const { email, password } = req.body;
    const exist = await Client.findOne({
      attributes: ['id', 'password'],
      where: { email },
    });
    if (exist) {
      if (exist.password == password) {
        return res.json({ error: 0, id: exist.id });
      } else {
        return res.json({ error: 1, erro: 'Senha incompatível' });
      }
    }
    return res.json({ error: 1, erro: 'Email inexistente' });
  },
};
