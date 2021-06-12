const express = require("express");
const path = require("path");
const PORT = process.env.PORT||3000;
const app = express();
const htmlRoutes = require("./routes/htmlroutes")
const apiRoutes = require("./routes/apiroutes")


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.use(apiRoutes)
app.use(htmlRoutes)

app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));