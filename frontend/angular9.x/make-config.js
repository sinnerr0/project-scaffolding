const fs = require("fs");
const packageJson = require("./package.json");
const CONFIG_FILE_PATH = "./src/config.json";

// check a config file
if (!fs.existsSync(CONFIG_FILE_PATH)) {
  fs.writeFileSync(CONFIG_FILE_PATH, "{}");
}

// wirte environments
let config = require(CONFIG_FILE_PATH);
config["VERSION"] = packageJson.version;

// wirte config file
fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config, null, 2));
