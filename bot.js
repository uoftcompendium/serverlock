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
 

  if(command === "lock") {
    if(!message.member.roles.cache.some(r=>["Moderator"].includes(r.name)) )
      return message.reply("Insufficient permissions");    const sayMessage = args.join(" ");
    message.guild.channels.cache.forEach(c => c.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false
    }))
    message.channel.send("`Serverlock` has been initiated. Admin override enabled. <:success:718289545501605960>");
    message.channel.send("Channel overrides automatically enabled: `714287938376040540` INT_4");
    message.channel.send("Channel overrides automatically revoked: `701692208671096934` INT_7");
    message.channel.send("Moderator override disabled. Confirm PIN.");
  }
    
  if(command === "bypass") {
    // To get the "message" itself we join the `args` back into a string with spaces: 
    if(!message.member.roles.cache.some(r=>["Moderator"].includes(r.name)) )
      return message.reply("you have no power here");    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    // And we get the bot to say the thing: 
    message.channel.send("This server is currently under **lockdown**. Staff are currently investigating the raid.");
  }

  if(command === "unlock") {
    if(!message.member.roles.cache.some(r=>["Admin"].includes(r.name)) )
      return message.reply("Insufficient permissions");    const sayMessage = args.join(" ");
    message.guild.channels.cache.forEach(c => c.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: true
    }))
    message.channel.send("Initiating `Serverlock` reconfiguration.");
    message.channel.send("Channel overrides automatically nulled: `714287938376040540` INT_4");
    message.channel.send("Channel overrides automatically nulled: `701692208671096934` INT_7");
    message.channel.send("`Serverlock` has been disabled. Admin override: `null` <:success:718289545501605960>");

  }
});

client.login(process.env.BOT_TOKEN);
