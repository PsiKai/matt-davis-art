if (process.env.NODE_ENV === 'production') {
    require("dotenv").config();
}

const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started on port " + port));
