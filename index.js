const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;           

app.use (express.static("public"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const controllers = require("./controllers");
app.use(controllers);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

