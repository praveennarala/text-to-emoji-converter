const express = require('express');
const cors = require("cors");
const connectDB = require('./db/connect');

const app = express();

app.use(express.json());
app.use(cors());

const texts = require('./routes/texts');
app.use('/api/texts', texts);

const dbUrl = "mongodb://localhost:27017/text-to-emoji";

connectDB(dbUrl);

const port = process.env.PORT || 4040;

app.listen(port, console.log(`Server is running on port:${port}`));