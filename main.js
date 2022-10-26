const { Telegraf } = require('telegraf');
const fs = require('fs');
const axios = require('axios');
const weather = require('weather-js');

const bot = new Telegraf('5492475513:AAFQUBiZo9rmSVMzX9VIPti_j0kU_ovuJOY');

const helpMessage = "Este es un bot creado para monitoreo de precios y asistencia a la comunidad de telegram PC Master Mundial"

const downloadImage = (url, image_path, ctx) =>
    axios({ url, responseType: "stream"}).then(
        (response) =>
            new Promise((resolve, reject) => {
                response.data
                    .pipe(fs.createWriteStream(image_path))
                    .on("finish", () => {
                        ctx.reply("Almacenada Correctamente");
                        resolver();
                    })
                    .on("error", (e) => {
                        ctx.reply("No puede almacenarse correctamente");
                        reject(e);
                    });
            })
    );

function random(number) {
    return Math.floor(Math.random() * (number + 1));
}

bot.start((ctx) => {
    ctx.reply('Hola Mundo');
});

bot.help((ctx) => {
    ctx.reply(helpMessage);
});

bot.command('random', (ctx) => {
    ctx.reply(random(100));
});

bot.command('advancerandom', (ctx) => {
    
    const message = ctx.update.message.text
    const randomNumber = Number(message.split(' ')[1])

    if(isNaN(randomNumber) || randomNumber <= 0){
        ctx.reply("Escribe /advancerandom seguido de un numero mayor de 0, por ejemplo: /advancerandom 10")
    } else {
        ctx.reply(random(randomNumber));
    }
});

//bot.on('text', (ctx) => {
//    ctx.reply(ctx.update.message.text);
//});

bot.on('photo', (ctx) => {
    const fileId = ctx.update.message.photo[3].file_id

    ctx.telegram.getFileLink(fileId).then((response) => {
        console.log(response);
    })

    ctx.reply("Me has enviado una foto");
});

bot.command('buscar', (ctx) => {
    ctx.reply('Buscar');
});

bot.launch();