module.exports = {
    name: 'addSong',
    async execute(client, queue, song) {
        queue?.textChannel?.send({
            content: `<@${song.user.id}>, **${song.name}** añadido a la cola. ✅`
        }).catch(e => {})
    }
}