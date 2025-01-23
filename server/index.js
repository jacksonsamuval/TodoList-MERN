require('dotenv').config();
const express = require('express');
const RunServer = require('./database/connection');
const cors = require('cors');
const todoRouter = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

RunServer();

app.use("/todolist", todoRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});