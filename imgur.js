const TelegramBot = require('node-telegram-bot-api');
const token = '5492475513:AAFQUBiZo9rmSVMzX9VIPti_j0kU_ovuJOY';
const bot = new TelegramBot(token, { polling: true });
const imgur = require('imgur-node-api');

// Creamos el comando
bot.onText(/^\/imgur/, function(msg){
    var chatId = msg.chat.id;

    if (msg.reply_to_message == undefined){
        return;
    };

    var photo = msg.reply_to_message.photo[2].file_id

    bot.getFileLink(photo).then(function(enlace){
        console.log(enlace);
        var clientId = '77d7ab786cffe84'

        imgur.setClientID(clientId)

        imgur.upload(enlace, function(err, res){
            console.log(res.data.link)

            var link = res.data.link;
            bot.sendMessage(chatId, "Enlace de la imagen subida a Imgur: \n" + link)
        })  
    });
});
