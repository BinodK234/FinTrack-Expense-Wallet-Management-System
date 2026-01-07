const app = require("./src/app");
const sequelize = require("./src/config/db");
require("dotenv").config();
const PORT = process.env.PORT | 5000;

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("MySQL connected");
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log("DB Connection Failed", err);
//   });

// checking sql connection and model synch

sequelize.authenticate().then(async () => {
  console.log('MySQL connected');
  await sequelize.sync({alter: true})
  console.log('Model synced');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  }) 
})