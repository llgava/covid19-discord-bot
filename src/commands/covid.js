const { MessageEmbed } = require('discord.js');
const { flag, name } = require('country-emoji');
const fetch = require("node-fetch");

module.exports.run = async (Client, message, args) => {
  const AuthorUsername = message.author.username;
  let URL = undefined;
  let Config = { flag: undefined, name: undefined }

  message.delete();
  if(args.length === 0 || args[0] !== 'stats') {
    message.author.send("You are using a wrong syntax, try to use `!covid stats <country_code or global>`.");
    return;
  }

  if(args[1] === 'global' || args[1] === undefined) {
    URL = 'https://covid19.mathdro.id/api';
    Config.flag = '🌎';
    Config.name = 'Global';
  } else {
    URL = `https://covid19.mathdro.id/api/countries/${args[1]}`;
    Config.flag = flag(args[1]);
    Config.name = name(args[1]);
  }

  fetch(URL).then(response => {
    response.json().then(data => {

      // Discord Embed Messages
      const EmbedMessageGlobal = new MessageEmbed()
        .addField(`${Config.flag} **You are looking for the ${Config.name} Statistics.**`, '\u200b')
        .addFields(
          { name: '😷 Confirmed', value: data.confirmed.value, inline: true },
          { name: '😢 Deaths', value: data.deaths.value, inline: true },
          { name: '💪 Recovered', value: data.recovered.value, inline: true },
          {
            name: 'What I can do to protect me and my family?', value: 'Most infected people experience a mild illness and recover, but it can be more serious for other people. Use the command `!protection` to see the **World Health Organization** guidelines.'}
        )

      message.channel.send(EmbedMessageGlobal);
    });
  });
}
