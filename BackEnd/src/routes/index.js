const express = require('express');
const newUser = require('./Users');
const newAdmin = require('./Admin');
const newEmployee = require('./Employee');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const fs = require('fs');

// Sửa đường dẫn theo vị trí thực tế của file
const filePath = fs.readFileSync(path.resolve('src/pet_swagger.yaml'), 'utf-8')
const swaggerDocument = YAML.parse(filePath);

function route(app) {
    app.use('/users', newUser);
    app.use('/Admin', newAdmin);
    app.use('/Admin/employee', newEmployee);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.get('/', (req, res) => res.send("hello"));
}

module.exports = route;