const express = require('express');
const AuthController = require('./controllers/AuthController');
const CategoryController = require('./controllers/CategoryController');
const HomeController = require('./controllers/HomeController');
const ModelController = require('./controllers/ModelController');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ hello: 'World' });
});

routes.post('/login/sign', AuthController.sign);
routes.post('/login', AuthController.login);
routes.post('/category/create', CategoryController.create);

routes.post('/home', HomeController.list);

routes.post('/models/category', ModelController.list);
routes.post('/models/category/name', ModelController.list_categories);
routes.post('/models', ModelController.list_model);
routes.post('/models/create', ModelController.createModel);
routes.post('/models/get', ModelController.getModel);

module.exports = routes;
