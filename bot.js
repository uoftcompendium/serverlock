const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

client.on('ready', () => {

    console.log('I am ready!');
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
 

  if(command === "lockdown") {
    if(!message.member.roles.some(r=>["Owner"].includes(r.name)) )
      return message.reply("Insufficient permissions");    const sayMessage = args.join(" ");
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false
    })
    message.channel.send("All channels have been locked.");
  }

client.login(process.env.BOT_TOKEN);
