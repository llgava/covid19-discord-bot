const fs = require("fs").promises;
const path = require("path");

async function commandHandler(Client, dir) {
  let files = await fs.readdir(path.join(__dirname, '../', dir));
  for (let file of files) {
    let stat = await fs.lstat(path.join(__dirname, '../', dir, file));

    // Categorizer by folder
    if (stat.isDirectory()) {
      registerCommands(path.join(dir, file));
    } else {
      if (file.endsWith(".js")) {

        // Command Register
        let commandName = file.substring(0, file.indexOf(".js"));
        let commandModule = require(path.join(__dirname, '../', dir, file));

        Client.commands.set(commandName, commandModule);
      }
    }
  }
}

module.exports.commandHandler = commandHandler;
