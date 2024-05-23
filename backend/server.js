const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const dashboardRoutes = require('./routes/dashboardDataRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

connectDB();

// middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/dashboard', dashboardRoutes);


app.listen(PORT, (error) =>{
    if (!error){
        console.log("Server running. Listening to port : " + PORT);
    }
    else{
        console.log("Server failed : ", error);
    }
});
