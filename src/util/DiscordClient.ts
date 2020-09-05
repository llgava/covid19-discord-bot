import * as Discord from 'discord.js';
import { Client } from 'discord.js';

require('dotenv').config()

export default class DiscordClient {
  private Client: Client
  private Config: any;

  constructor() {
    this.Client = new Discord.Client();
    this.Config = { token: process.env.TOKEN };
  }

  public start(): void {
    const BotClient = this.Client;

    BotClient.login(this.Config.token);
    BotClient.on('ready', () => {
      console.clear();
      console.log("Prontinho");
    });
  }
}
