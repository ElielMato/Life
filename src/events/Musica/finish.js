module.exports = {
    name: 'finish',
    async execute(client, queue, playlist) {
        queue?.textChannel?.send({ content: `La cola está vacía. Puedes reproducir más música, adiós... ✅` }).catch(e => { })
    }
}