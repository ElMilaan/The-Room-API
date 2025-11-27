const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const setupSwagger = require('./swagger');

const app = express();

setupSwagger(app); // Marche pas c'est relou mais sûrement parce que cette app est server side only

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(errorHandler);

module.exports = app;