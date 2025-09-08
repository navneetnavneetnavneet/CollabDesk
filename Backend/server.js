const app = require("./src/app");
const config = require("./src/config/config");
const connectDatabase = require("./src/database/database");

const port = config.PORT || 3000;

connectDatabase();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
