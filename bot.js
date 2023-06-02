const {
	Client,
	GatewayIntentBits,
	Partials,
	Collection,
	EmbedBuilder,
	ActivityType
} = require("discord.js")
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildWebhooks,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.GuildScheduledEvents,
	],
	partials: [
		Partials.User,
		Partials.Message,
		Partials.Channel,
		Partials.Reaction,
		Partials.GuildMember,
		Partials.GuildScheduledEvent,
		Partials.ThreadMember,
	],
})
const fs = require('fs')
require('dotenv').config()
const { join } = require('path')
const Config = require('./config.json')

const { slash } = require(`${__dirname}/src/utils/handler/commands.js`)
const { events } = require(`${__dirname}/src/utils/handler/events.js`)

events(fs, client)
slash(fs, client, Collection)

//ESTADO
setInterval(() => {
    updateStatus()
}, 60000)

async function updateStatus() {
    const guildNum = await client.guilds.cache.size
    const memberNum = await client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)

    await client.user.setPresence({
		activities: [
			{
				name: `Servidores: ${guildNum} Miembros: ${memberNum}`,
				type: ActivityType.Listening,
			},
		],
		status: "online",
	})
}

//MONGODB
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(db => console.log('|-------------------|\n|Conectado a MongoDB|\n|-------------------|')).catch((e) => {
		console.log(e);
});

//LEVELS
client.on("messageCreate", async message => {
	const { LevelsServer } = require("./src/functions/Level")
	LevelsServer(message, client)
})

//SORTEOS
const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./Database/giveaways.json",
  default: {
    botsCanWin: false,
    embedColor: Config.color.CELE,
    reaction: "🎉",
  }
});

//LANGUAGES
client.languages = require('i18n')
client.languages.configure({
	locales: ['en', 'es'],
	directory: join(__dirname, "./src/lang"),
	defaultLocale: 'es',
	retryInDefaultLocale: true,
	objectNotation: true,
	register: global,

	logWarnFn: function (msg) {
		console.log('WARN' + msg)
	},

	logErrorFn: function (msg) {
		console.log('ERROR' + msg)
	},

	missingKeyFn: function (locale, value) {
		return value
	},

	mustacheConfig: {
		tags: ["{{", "}}"],
		disable: false
	}
})

//MUSIC
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { DeezerPlugin } = require("@distube/deezer");
const { YtDlpPlugin } = require("@distube/yt-dlp");
client.player = new DisTube(client, {
  leaveOnStop: true,
  leaveOnFinish: true,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin(),
    new SoundCloudPlugin(),
    new YtDlpPlugin(),
    new DeezerPlugin()
  ],
});

client.login(process.env.TOKEN)