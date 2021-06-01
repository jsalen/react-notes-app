require("dotenv").config();

const app = require("./app.js");
require("./database.js");

async function main() {
  await app.listen(app.get("port"));

  console.log(`server on port ${app.get("port")}`);
}

main();
