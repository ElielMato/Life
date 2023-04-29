module.exports.events = async function (fs, client) {
    const eventFolder = fs.readdirSync(__dirname + "/" + `../../events/`)
    for (const folder of eventFolder) {
        const eventFile = fs.readdirSync(__dirname + "/" + `../../events/${folder}`);
        for (const file of eventFile) {
            const event = await require(__dirname + "/" + `../../events/${folder}/${file}`);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    }
}