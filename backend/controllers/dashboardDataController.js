const DashboardData = require('../models/dashboardDataModel');
const asyncHandler = require('express-async-handler');

const getDashboardChart = asyncHandler(async (req,res)=>
{
    const filters = req.query;
    let query = {};
    for (let key in filters) {
      if (filters[key]) {
        query[key] = { $regex: filters[key], $options: 'i' };
      }
    }
  
    try {
      const data = await DashboardData.find(query);
      res.json({ data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});



const getDashboardTable = asyncHandler(async (req, res) => {
    
        const { page = 1, limit = 10, ...filters } = req.query;
  let query = {};
  for (let key in filters) {
    if (filters[key]) {
      query[key] = { $regex: filters[key], $options: 'i' };
    }
  }

  try {
    const data = await DashboardData.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await DashboardData.countDocuments(query);
    res.json({
      data,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// const getDashboardTable = asyncHandler(async (req,res)=>
//     {

        
//         const { filters,page, limit } = req.query;
//         let query = {};
//         for (let key in filters) {
//             if (filters[key]) {
//               query[key] = { $regex: filters[key], $options: 'i' };
//             }
//           }
//     const options = {
//     page: parseInt(page, 10) || 1,
//     limit: parseInt(limit, 10) || 10,
//   };
  

//   try {
//     const data = await DashboardData.find(query).skip((options.page - 1) * options.limit).limit(options.limit);
//     const totalCount = await DashboardData.countDocuments(query);
//     const totalPages = Math.ceil(totalCount / options.limit);
//     res.json({ data, totalPages, currentPage: options.page });
//   } catch (error) {
//     console.error('Error fetching table data:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }


// //         const { page = 1, limit = 10, ...filters } = req.query;
// //   let query = {};
// //   for (let key in filters) {
// //     if (filters[key]) {
// //       query[key] = { $regex: filters[key], $options: 'i' };
// //     }
// //   }

// //   try {
// //     const data = await DashboardData.find(query)
// //       .limit(limit * 1)
// //       .skip((page - 1) * limit)
// //       .exec();
// //     const count = await DashboardData.countDocuments(query);
// //     res.json({
// //       data,
// //       totalPages: Math.ceil(count / limit),
// //       currentPage: page
// //     });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// });

module.exports = { getDashboardTable, getDashboardChart };