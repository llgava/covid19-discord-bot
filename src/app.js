const { commandHandler } = require("./util/CommandHandler");
const Discord = require("discord.js");
require("dotenv").config();

const Config = {
  token: process.env.TOKEN,
  prefix: process.env.PREFIX
}
const Client = new Discord.Client();

Client.commands = new Map();

Client.login(Config.token);
Client.on("ready", () => {
  Client.user.setPresence({ activity: { name: `with ${Config.prefix}help command`, type: 'PLAYING' } })
  console.clear();
  console.log("Pai ta on");
});

// Commands
Client.on('message', (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(Config.prefix)) return;

  let args = message.content.slice(Config.prefix.length).trim().split(/ +/);
  let name = args.shift().toLowerCase();

  if (Client.commands.get(name)) {
    Client.commands.get(name).run(Client, message, args);
  }
});

commandHandler(Client, './commands');
