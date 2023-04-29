const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require("./../../..//config.json");

const builder = new SlashCommandBuilder()
  .setName("queue")
  .setDescription("Te muestra la lista de reproducción.")
  .setDescriptionLocalizations({
    "es-ES": "Te muestra la lista de reproducción.",
    "en-US": "It shows you the playlist",
  });

module.exports = {
  builder: builder.toJSON(),
  name: "queue",
  async run(client, interaction, language) {
    try {
      const queue = client.player.getQueue(interaction.guild.id);
      const embed = new EmbedBuilder()
          .setColor(Config.color.WARNING)
          .setDescription(client.languages.__({phrase: 'music.no-music', locale: language}))
      if (!queue || !queue?.playing) return interaction.reply({ embeds: [embed], ephemeral: true }).catch(e => { })
      
      const embed1 = new EmbedBuilder()
          .setColor(Config.color.WARNING)
          .setDescription(client.languages.__({phrase: 'music.queue-not', locale: language}))
      if (!queue.songs[0]) return interaction.reply({ embeds: [embed1], ephemeral: true }).catch((e) => {})

      const trackl = [];
      queue.songs.map(async (track, i) => {
        trackl.push({
          title: track.name,
          author: track.uploader.name,
          user: track.user,
          url: track.url,
          duration: track.duration,
        });
      });

      const backId = "emojiBack";
      const forwardId = "emojiForward";
      const backButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        emoji: "⬅️",
        customId: backId,
      });

      const deleteButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        emoji: "❌",
        customId: "close",
      });

      const forwardButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        emoji: "➡️",
        customId: forwardId,
      });

      let kaçtane = 8;
      let page = 1;
      let a = trackl.length / kaçtane;

      const generateEmbed = async (start) => {
        let sayı = page === 1 ? 1 : page * kaçtane - kaçtane + 1;
        const current = trackl.slice(start, start + kaçtane);
        if (!current || !current?.length > 0) {
          return interaction.reply({ embeds: [embed1], ephemeral: true }).catch((e) => {});
        }
        return new EmbedBuilder()
          .setTitle(client.languages.__mf({phrase: 'music.queue-title', locale: language}, {guild: interaction.guild.name}))
          .setThumbnail(interaction.guild.iconURL({ size: 2048, dynamic: true }),)
          .setColor(Config.color.CELE)
          .setDescription(client.languages.__({phrase: 'music.queue-desc1', locale: language}) + queue.songs[0].name + current.map((data) => `\n\`${sayı++}\` | [${data.title}](${data.url}) | **${data.author}**` + client.languages.__({phrase: 'music.queue-desc1', locale: language}) + data.user.tag))
          .setFooter({ text: client.languages.__({phrase: 'music.page', locale: language}) + `${page}/${Math.floor(a + 1)}` });
      };

      const canFitOnOnePage = trackl.length <= kaçtane;

      await interaction.reply({
        embeds: [await generateEmbed(0)],
        components: canFitOnOnePage
          ? []
          : [
            new ActionRowBuilder({ components: [deleteButton, forwardButton] }),
          ],
        fetchReply: true,
      }).then(async (Message) => {
        const filter = (i) => i.user.id === interaction.user.id;
        const collector = Message.createMessageComponentCollector({
          filter,
          time: 120000,
        });

        let currentIndex = 0;
        collector.on("collect", async (button) => {
          if (button?.customId === "close") {
            collector?.stop();
            const embed1 = new EmbedBuilder()
              .setColor(Config.color.CELE)
              .setDescription(client.languages.__({phrase: 'music.queue-close', locale: language}))
            return button?.reply({ embeds: [embed], ephemeral: true })
              .catch((e) => {});
          } else {
            if (button.customId === backId) {
              page--;
            }
            if (button.customId === forwardId) {
              page++;
            }

            button.customId === backId
              ? (currentIndex -= kaçtane)
              : (currentIndex += kaçtane);

            await interaction.editReply({
              embeds: [await generateEmbed(currentIndex)],
              components: [
                new ActionRowBuilder({
                  components: [
                    ...(currentIndex ? [backButton] : []),
                    deleteButton,
                    ...(currentIndex + kaçtane < trackl.length
                      ? [forwardButton]
                      : []),
                  ],
                }),
              ],
            }).catch((e) => {});
            await button?.deferUpdate().catch((e) => {});
          }
        });

        collector.on("end", async (button) => {
          button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("⬅️")
              .setCustomId(backId)
              .setDisabled(true),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("❌")
              .setCustomId("close")
              .setDisabled(true),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("➡️")
              .setCustomId(forwardId)
              .setDisabled(true),
          );

          const embed = new EmbedBuilder()
            .setTitle(client.languages.__({phrase: 'music.queue-title1', locale: language}))
            .setThumbnail(interaction?.guild?.iconURL({ size: 2048, dynamic: true }),)
            .setColor(Config.color.CELE)
            .setDescription(client.languages.__({phrase: 'music.queue-desc3', locale: language}))
          return interaction?.editReply({
            embeds: [embed],
            components: [button],
          }).catch((e) => {});
        });
      }).catch((e) => {});
    } catch (e) {
      console.error(e);
    }
  },
};
