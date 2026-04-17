const { MessageEmbed, Collection } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const beautify = require("beautify")

module.exports = {
    category: "Owner",
    data: new SlashCommandBuilder()
        .setName("eval")
        .setDescription("Executer des action (Owner du bot)")
        .addStringOption((option) =>
            option
                .setName("code")
                .setDescription("Le code pour executer l'action.")
                .setRequired(true)
        ),

    async execute(client, interaction) {

        const usersData = client.usersData;

        const guildsData = client.guildsData;

        if (interaction.user.id !== '702275012874338354') {
            return interaction.reply({ content: "Seul `!Dima.js#9893` peut utiliser cette commande !", ephemeral: true })

        } else {

            const content = interaction.options.getString('code');
            const result = new Promise((resolve) => resolve(eval(content)));

            return result.then((output) => {
                if (typeof output !== "string") {
                    output = require("util").inspect(output, { depth: 0 });
                }
                if (output.includes(client.token)) {
                    output = output.replace(client.token, "T0K3N");
                }

                const yes = new MessageEmbed()
                    .setTitle("📥 Code :")
                    .setDescription(`\`\`\`js\n${content}\n\`\`\``,)
                    .addField(`📤 Résultat :`, `\`\`\`js\n${beautify(output, { format: "js" })}\n\`\`\``)
    
                interaction.reply({ embeds: [yes] })
  
            }).catch((err) => {
                err = err.toString();
                if (err.includes(client.token)) {
                }

                err = err.replace(client.token, "T0K3N");

                const error = new MessageEmbed()
                    .setTitle("📥 Code :")
                    .setDescription(`\`\`\`js\n${content}\n\`\`\``,)
                    .addField(`📤 Erreur :`, `\`\`\`js\n${beautify(err, { format: "js" })}\n\`\`\``)
    
                interaction.reply({ embeds: [error] })

            });

        }
    }
}