const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const exphbs = require("express-handlebars");
const path = require("path");

const port = 5000;
const app = express();
const route = require("./routes");

// Cấu hình Handlebars
app.engine("hbs", exphbs.engine({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(morgan("combined"));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); // Dùng cho CSS, JS

// Routes
route(app);

// Trang chủ
app.get("/", (req, res) => {
    res.render("home", { title: "Trang Chủ" });
});

// Chạy server
app.listen(port, () => console.log(`http://localhost:${port}`));
