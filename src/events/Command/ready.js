module.exports = {
    name: 'ready',
    once: true,
    async execute(client, interaction) {
        
        console.log(`${client.user.tag} está online!`);

        let slashcmds = client.commands.map(c => c.builder)
        client.application.commands.set(slashcmds)    

    }
}