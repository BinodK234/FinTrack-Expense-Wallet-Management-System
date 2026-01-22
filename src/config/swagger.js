const swaggerJDos = require('swagger-jsdoc');
PORT = process.env.PORT || 5000;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Finance Management API",
            version: "1.0.0",
            description: "API documentation for Fintrack application"
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api`,
                description: "Local server"
            }

        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'

                }
            }
        },
        security: [
            {bearerAuth: []}
        ]
    },
    apis:  ['./src/routes/*.js']
}

module.exports = swaggerJDos(options)