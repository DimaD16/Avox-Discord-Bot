
const { MessageEmbed, Collection } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    category: "Owner",
    data: new SlashCommandBuilder()
        .setName("exit")
        .setDescription("Permet d'éteidre le bot (Owner du bot)"),

    async execute(client, interaction) {

        if (interaction.user.id !== '702275012874338354') {
            return interaction.reply({ content: "Seul `! Dima.js#3896` peut utiliser cette commande !", ephemeral: true })
        } else {
            await interaction.reply("Le bot a été eteint !")
            console.log("Process exited with code 1")
            process.exit()
        }
    }
}

