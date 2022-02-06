const express = require('express');
const multer = require('multer');

const AuthController = require('./controllers/AuthController');
const CategoryController = require('./controllers/CategoryController');
const HomeController = require('./controllers/HomeController');
const ShopController = require('./controllers/ShopController');
const ModelController = require('./controllers/ModelController');
const MediaController = require('./controllers/MediaController');

const multerConfig = require('./config/multer');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ hello: 'World' });
});

routes.post('/login/sign', AuthController.sign);
routes.post('/login', AuthController.login);
routes.post('/profile', AuthController.profile);
routes.post('/profile/edit', AuthController.editProfile);

routes.post('/category/create', CategoryController.create);
routes.post('/categories', CategoryController.list);
routes.post('/category/name', ModelController.list_categories);

routes.post('/home', HomeController.list);

routes.post('/models', ModelController.list_model);
routes.post('/models/recent', ModelController.list_model_recent);
routes.post('/models/confirmation', ModelController.confirm);
routes.post('/models/editing', ModelController.editModel);
routes.post('/models/get', ModelController.getModel);
routes.post('/models/edit', ModelController.getModelEdit);
routes.post('/models/delete', ModelController.delete);

routes.post('/shop', ShopController.list);
routes.post('/shop/model', ShopController.getModel);

routes.post(
  '/media/create',
  multer(multerConfig).single('file'),
  ModelController.createModel
);

module.exports = routes;
