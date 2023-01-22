const mongoose = require('mongoose');

const connectDatabase = () => {mongoose.connect(process.env.DB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    }).then((data) => {
        console.log(`Mongo connected with server ${data.connection.host}`);
    });
};
// const connectDatabaseTrends = () => {mongoose.connect(process.env.DB_URI_TRENDS,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//     }).then((data) => {
//         console.log(`Mongo connected with server2 ${data.connection.host}`);
//     });
// };



module.exports = connectDatabase;