const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const port = 5000;
const app = express();
const route = require("./routes");

const dotenv = require('dotenv').config();


app.use(morgan("combined"));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// Routes
route(app);


// Chạy server
app.listen(port, () => console.log(`http://localhost:${port}`));
