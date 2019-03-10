require = require("esm")(module);

const api = require('./api');
const config = require('./config');
const mongoose = require('./infrastructure/mongoose');

mongoose.default.connect();
api.default(config.default.api);