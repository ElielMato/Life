module.exports.slash = async function (fs, client, Collection) {
    client.commands = new Collection();
    const commandFolder = fs.readdirSync(__dirname + "/" + `../../commands`);
    for (const folder of commandFolder) {
        const commandFile = fs.readdirSync(__dirname + "/" + `../../commands/${folder}`);
        for (const file of commandFile) {
            const command = await require(__dirname + "/" + `../../commands/${folder}/${file}`);
            client.commands.set(command.name, command);
        }
    }
};