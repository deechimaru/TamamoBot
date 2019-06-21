// 3 files needed
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
function randomise(){
    var min=1; 
    var max=199;  
    return Math.floor(Math.random() * max) + min;
}

var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    bot.setPresence( {game: {name:"&help"}} );
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `&`
    if (message.substring(0, 1) == '&') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        var rand = randomise();
        switch(cmd) {
            // @ffox
            case 'help':
                bot.sendMessage({
                    to: userID,
                    message: "Hi! I'm Tamamo, custom discord bot made by D-Ecchi. `I'm currently in Alpha stage, so everything can happen.` These are current commands [use & prefix]:```fox: sends a wild Tamamo! \nping: pings (in case of lag etc.) \nallow: makes certain channel Tamamo-able! \nhelp: help!```"
                })
            break;
            case 'fox':
                bot.sendMessage({
                    to: channelID,
                    message: 'Tamamo #' + rand
                });
                bot.uploadFile({
                    to: channelID,
                    file: 'image/tamamo (' + rand + ').jpg'
                });
            break;
            case 'TODO':
                bot.sendMessage({
                    to: userID,
                    message: 'Todo: channel restrict, reporting/etc images'
                });
            break;
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            // Just add any case commands if you want to..
         }
     }
});
