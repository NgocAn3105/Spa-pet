const express=require("express")
const port =5000;
const app=express();

const morgan=require('morgan');
app.use(morgan('combined'))
const cors = require("cors");
const route=require('./routes')

app.use(express.json());
app.use(cors());
route(app);


app.listen(port,()=>console.log(`http://localhost:${port}`));
