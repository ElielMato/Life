module.exports = {
    name: 'addList',
    async execute(client, queue, playlist) {
        queue?.textChannel?.send({
            content: `<@${playlist.user.id}>, \`${playlist.name} (${playlist.songs.length} músicas)\` "ista de reproducción con nombre añadida. ✅`
        }).catch(e => {})
    }
}