const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Appointment API',
            version: '1.0.0',
            description: 'API documentation for appointment creation and management',
        },
    },
    apis: ['./routes/*.js'], // Đường dẫn đến các file chứa route (đảm bảo có comment Swagger trong các route)
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
    swaggerSpec,
    swaggerUi,
};
