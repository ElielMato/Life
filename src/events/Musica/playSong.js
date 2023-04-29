module.exports = {
    name: 'playSong',
    async execute(client, queue, song) {
        if (queue) {
            if (!client.config.opt.loopMessage && queue?.repeatMode !== 0) return;
                if (queue?.textChannel) {
                queue?.textChannel?.send({ content: `🎵 Reproduciendo: **${track?.title}** -> Canal: **${queue?.connection.channel.name}** 🎧` }).catch(e => { });
            }
        }
    }
}