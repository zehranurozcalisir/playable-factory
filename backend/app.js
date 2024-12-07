const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require("dotenv");
const path = require('path');

const port = 5000;
const cors = require('cors');
dotenv.config();
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Connected");
    } catch (error) {
        console.log(error);
    }
}
app.use('/public', express.static(path.join(__dirname, 'public')));

const loginRoute = require('./routes/authRoutes');
const taskRoute = require('./routes/taskRoutes.js');

app.use(cors());
app.use(express.json());
app.use('/auth', loginRoute);
app.use('/api', taskRoute);

//middleware
app.listen(5000, () => {
    connect();
});
