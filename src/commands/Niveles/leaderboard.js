const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const Emoji = require('../../json/emoji.json')

const builder = new SlashCommandBuilder()
    .setName('leaderboard')	
    .setDescription('Mira el top de niveles del servidor')
    .setDescriptionLocalizations({
        "es-ES": "Mira el top de niveles del servidor",
        "en-US": "See the top levels of the server"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'leaderboard',
    async run(client, interaction, language) {
        
        const star = client.emojis.cache.get(Emoji.starLevel)
        
        const MongoClient = require('mongodb').MongoClient;
        const uri = "mongodb+srv://ElielMato:Elo2005@cluster0.ulxkv.mongodb.net/lifedev?retryWrites=true&w=majority";
        const mongo = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        mongo.connect(err => {
        const collection = mongo.db("lifedev").collection("levels");
        collection.find({ GuildId: interaction.guild.id }).sort({ XP: -1 }).limit(10).toArray(function(err, results) {
            if (err) throw err;

            let description = '';
            for (let i = 0; i < results.length; i++) {
                const user = results[i];
                description += `${i + 1}. <@${user.UserId}>: **${user.Level}** ${star}\n`;
            }

            const embed = new EmbedBuilder()
                .setTitle(`${star} | Leaderboard | ${star}`)
                .setColor(Config.color.CELE)
                .setDescription(description);

            interaction.reply({embeds: [embed]});

            mongo.close();
        });
        });
        
        
        
        
        
        
        
        
        
        
        
        
        
        //const rawLeaderboard = await Levels.fetchLeaderboard(interaction.guild.id, 10);
//
        //const embedNoLeader = new EmbedBuilder()
        //    .setColor(Config.color.CELE)
        //    .setDescription(client.languages.__({phrase: 'leaderboard.no-leader',locale: language}))
//
        //if (rawLeaderboard.length < 1) return interaction.reply({embeds: [embedNoLeader], ephemeral: true})
//
        //const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
        //const lb = leaderboard.map(e => `**${e.position}.** ${e.username} • **Level:** ${e.level}`);
//
        //const embed = new EmbedBuilder()
        //.setColor(Config.color.CELE)
        //.setTitle(client.languages.__({phrase: 'leaderboard.title', locale: language}))
        //.setDescription(`\n\n${lb.join("\n\n")}`)
//
        //interaction.reply({embeds: [embed]})

    }
}