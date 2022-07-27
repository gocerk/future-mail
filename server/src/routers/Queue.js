const Router = require('express').Router();
const { addToQueue, redirectHandler } = require('../controllers/QueueController');

Router.get('/', redirectHandler)
Router.post('/', addToQueue);

module.exports = Router;