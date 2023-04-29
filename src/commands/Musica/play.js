const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require("./../../..//config.json");

const builder = new SlashCommandBuilder()
  .setName("play")
  .setDescription("Escucha una cancion")
  .setDescriptionLocalizations({
    "es-ES": "Escucha una cancion",
    "en-US": "Listen to a song"
  })
  .addSubcommand((subcommand) =>
    subcommand
      .setName("cancion")
      .setNameLocalizations({
        "es-ES": "cancion",
        "en-US": "song",
      })
      .setDescription("Escucha una cancion")
      .setDescriptionLocalizations({
        "es-ES": "Escucha una cancion",
        "en-US": "Listen to a song",
      })
      .addStringOption((option) =>
        option
          .setName("nombre")
          .setNameLocalizations({
            "es-ES": "nombre",
            "en-US": "name",
          })
          .setDescription("Elige el nombre de tu cancion")
          .setDescriptionLocalizations({
            "es-ES": "Elige el nombre de tu cancion",
            "en-US": "Choose the name of your song",
          })
          .setRequired(true)))

module.exports = {
  builder: builder.toJSON(),
  name: "play",
  async run(client, interaction, language) {
    try {
      if (interaction.options.getSubcommand() === "cancion") {
        const name = interaction.options.getString("nombre");
        if (!name) {
          const embed= new EmbedBuilder()
                .setColor(Config.color.WARNING)
                .setDescription(client.languages.__({phrase: 'music.not-song', locale: language}))
          return interaction.reply({ embeds: [embed], ephemeral: true }).catch((e) => {});
        }

        const embed1 = new EmbedBuilder()
                .setColor(Config.color.CELE)
                .setDescription(client.languages.__({phrase: 'music.load-song', locale: language}))
        await interaction.reply({ embeds: [embed1], ephemeral: true }).catch((e) => {});
        try {
          await client.player.play(interaction.member.voice.channel, name, {
            member: interaction.member,
            textChannel: interaction.channel,
            interaction,
          });
        } catch (e) {
          const embed1 = new EmbedBuilder()
                .setColor(Config.color.CELE)
                .setDescription(client.languages.__({phrase: 'music.load-song', locale: language}))
        await interaction.reply({ embeds: [embed1], ephemeral: true }).catch((e) => {});
        }
      }
    } catch (e) {
      console.error(e);
    }
  },
};
