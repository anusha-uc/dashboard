const fs = require('fs');
const Mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Load models
const DashboardData = require('./models/dashboardDataModel');

// Connect to DB
Mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const DashboardDatas = JSON.parse(
    fs.readFileSync(`${__dirname}/jsondata.json`, 'utf-8')
);


// Import into DB
const importData = async () => {
    try {
        await DashboardData.create(DashboardDatas);
        
        console.log('Data Imported...');
        process.exit();
    } catch (err) {
        console.error(err);
    }
};


if (process.argv[2] === '-i') {
    importData();
}