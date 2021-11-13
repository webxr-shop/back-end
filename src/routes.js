const express = require('express');
const AuthController = require('./controllers/AuthController');
const CategoryController = require('./controllers/CategoryController');
const HomeController = require('./controllers/HomeController');
const ModelController = require('./controllers/ModelController');
const TemplateController = require('./controllers/TemplateController');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ hello: 'World' });
});

routes.post('/login/sign', AuthController.sign);
routes.post('/login', AuthController.login);

routes.post('/category/create', CategoryController.create);

routes.post('/home', HomeController.list);

routes.post('/create', TemplateController.create);

routes.post('/models/category', ModelController.list);
routes.post('/models', ModelController.list_model);

module.exports = routes;
