const Router = require('express').Router();
const { getId } = require('../controllers/DbController');

Router.post('/', getId);

module.exports = Router;