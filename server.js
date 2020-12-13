const { urlencoded } = require("express");
const express = require("express");
const hbs = require("express-handlebars");
const app = express(); // Init Express
const con = require("./config/db"); // require the conn objetc
con(); // Init The Connection
// REQUIRE Route File
const todoRoutes = require("./routes/todo");

// Handlebras Helpers ifeq = value dosent exsiste by default
const handlebars = hbs.create({
  helpers: {
    ifeq: function (a, b, options) {
      if (a == b) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
  },
  defaultLayout: "main",
});
// Init handlebars template engine
app.engine("handlebars", handlebars.engine);

app.set("view engine", "handlebars");

// Acsept form data
app.use(urlencoded({ extended: true }));
// Mount The Route file
app.use("/", todoRoutes);

// About Page
app.get("/about", (req, res) => {
  res.render("about", { title: " About Page" });
});

// 404 Route
app.use((req, res) => {
  res.render("404", { title: " Page Not Found" });
});
// Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Starting ${PORT}`));
