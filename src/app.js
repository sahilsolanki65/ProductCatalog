const express = require('express');
const app = express();

require('dotenv').config();
const port = process.env.PORT;

app.use(express.json());
app.use('/api/auth', require("./routes/auth.js"));
app.use('/api/account', require("./routes/account.js"));
app.use('/api/imports', require("./routes/imports.js"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

module.exports = app;