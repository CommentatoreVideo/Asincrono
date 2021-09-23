const express = require("express");
const app = express();
app.use(express.static("public"));

module.exports = app;
// Quando si fa un commit bisogna commentare la riga sotto
// app.listen(3000, () => console.log('Server partito'));
