const express = require('express');
const routes = express.Router();

const DevController = require('./Controllers/DevController');
const LikeController = require('./Controllers/LikeController');

routes.get('/devs', DevController.index);

routes.post('/devs/store', DevController.store);

routes.post('/devs/:method/:devId', LikeController.store);

module.exports = routes;