const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    EmbedBuilder,
    PermissionFlagsBits,
    AttachmentBuilder
} = require("discord.js");
const Config = require('./../../..//config.json');
const Canvas = require('canvas');
const { registerFont } = require('canvas');
const { interact } = require('star-labs');


const builder = new SlashCommandBuilder()
    .setName('guilds')	
    .setDescription('Cantidad de servidores')

module.exports = {
    builder: builder.toJSON(),
    name: 'guilds',
    async run(client, interaction, language) {

        try {

            
//
            //registerFont("BrunoAceSC-Regular.ttf", {
            //    family: "Bruno Ace SC"
            //})
//
            //const applyText = (canvas, text) => {
            //    const ctx = canvas.getContext('2d');
//
            //    let fontsize = 80;
//
            //    do {
            //        ctx.font = `${fontsize -= 10}px Bruno Ace SC`;
            //    } while (ctx.measureText(text).width > canvas.width - 200);
            //    return ctx.font
            //}
//
            //const canvas = Canvas.createCanvas(1920, 1080);
            //const ctx = canvas.getContext('2d');
//
            //const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1011760195048849490/1100508949112959026/v1_final_fondo.png");
//
            //ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
//
            //ctx.fillStyle = "#ffffff";
            //ctx.font = applyText(canvas, `Bienvenido a ${interaction.user.username}`);
//
            //ctx.fillText(`Bienvenido a ${interaction.user.username}`, 620, 920)
//
            //ctx.beginPath();
            //ctx.arc(954, 201, 170, 0, Math.PI * 2, true);
            //ctx.closePath();
            //ctx.clip();
//
            //const avatar = await Canvas.loadImage(interaction.user.displayAvatarURL({
            //    size: 1024,
            //    extension: "png"
            //}));
//
            //ctx.drawImage(avatar, 720, 33, 445, 350)
//
            //const attachement = new AttachmentBuilder(canvas.toBuffer("image/png"), {
            //    name: "welcome.png"
            //})
//
//
            //await interaction.reply({
            //    files: [attachement]
            //})

        } catch (error) {
            console.log("Error en SlashCommand:" + error);
        }


        












        //const embedPerms = new EmbedBuilder()
        //    .setDescription('🔒 | Este comando es para developers')
        //    .setColor(Config.color.WARNING)
        //
        //if (interaction.user.id !== "485223539557793792") return interaction.reply({
        //    embeds: [embedPerms]
        //});
        //
        //let servidores = client.guilds.cache.size
        //let embed = new EmbedBuilder()
        //    .setDescription('**' + servidores + "** Servidores")
        //    .setColor(Config.color.CELE)
        //
    //
        //interaction.reply({
        //    embeds: [embed]
        //})
    }
}
