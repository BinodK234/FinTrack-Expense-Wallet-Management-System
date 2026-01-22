const app = require("./src/app");
const sequelize = require("./src/config/db");
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./src/config/swagger')
require("dotenv").config();
const PORT = process.env.PORT || 5000;

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
sequelize.authenticate().then(async () => {
  console.log('MySQL connected');
  await sequelize.sync({alter: false})
  console.log('Model synced');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
     console.log(`Swagger: http://localhost:${PORT}/api-docs`)
  }) 
})