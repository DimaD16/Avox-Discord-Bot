const { MessageEmbed, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const guild = require("../../models/guild.js");


module.exports = {
    category: "Modération",
    data: new SlashCommandBuilder()
        .setName("anticaracter")
        .setDescription("Active la protection anti caractère !")
        .addStringOption((option) =>
            option.setName("mode")
                .setDescription("Le mode de la protection anti caractère.")
                .setRequired(true)
                .addChoice("on", "on")
                .addChoice("off", "off")
        ),
    
    async execute(client, interaction) {
        const mode = interaction.options.getString("mode");
    
        if (mode === "on") {
            const query = await guild.findOne({
                where: { guild_id: interaction.guild.id },
            });
            if (!query) {
                await guild.create({
                    guild_id: interaction.guild.id,
                    anti_character: true,
                });
            } else {
                await query.update({
                    anti_character: true,
                });
            }
            interaction.reply("La protection anti caractère a bien été activée !");
        } else if (mode === "off") {
            const query = await guild.findOne({
                where: { guild_id: interaction.guild.id },
            });
            if (!query) {
                await guild.create({
                    guild_id: interaction.guild.id,
                    anti_character: false,
                });
            } else {
                await query.update({
                    anti_character: false,
                });
            }
            interaction.reply("La protection anti caractère a bien été désactivée !");
        }
    }
}
    