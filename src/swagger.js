const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'The Room API',
            version: '1.0.0',
            description: "Doc de l'API The Room",
        },
        servers: [
            {
                // url: 'http://localhost:3000',
                url: "https://the-room-3n3qbr2hi-milans-projects-c8f04765.vercel.app/"
            },
        ],
    },
    apis: ['./src/routes/index.js'],
};

const specs = swaggerJsdoc(options);

function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

module.exports = setupSwagger;
