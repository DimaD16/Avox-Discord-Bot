module.exports = {
    name: "interactionCreate",

    async execute(interaction) {
        
        const { client } = interaction

        if (!interaction.isCommand())
            return;

        const command = client.slashCommands.get(interaction.commandName);

        if (command.disable) {
            return await interaction.reply({
                content: "La commande est désactivée.",
                ephemeral: true,
            });

        }
        if (!command)
            return;

        try {
            await command.execute(client, interaction);
        } catch (err) {
            console.error(err);
            await interaction.reply({
                content: "Il y'a eu un probléme avec la commande. Veuiller bien contacter le créateur.",
                ephemeral: true,
            });
        }
    }
}
