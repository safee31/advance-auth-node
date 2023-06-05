require("dotenv").config();
require("colors");
const { PORT } = require("./Config");
const app = require("./app");

const port = PORT || 8000;
const server = app.listen(port, (res) => {
  console.log(`✔ Server Running On: ${PORT}`.yellow.italic);
});

process.on("unhandledRejection", (err, promis) => {
  console.log(`Logged Error => ${err}`);
  server.close(() => process.exit(1));
});
