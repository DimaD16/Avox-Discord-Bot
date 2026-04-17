const { MessageEmbed, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const guild = require("../../models/guild.js");


module.exports = {
    category: "Modération",
    data: new SlashCommandBuilder()
        .setName("antirecentaccount")
        .setDescription("Active l'anti compte récent !")
        .addStringOption((option) =>
            option
                .setName("mode")
                .setDescription("Le mode de l'anti compte récent.")
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
                    welcome_recent: true,
                });
            } else {
                await query.update({
                    welcome_recent: true,
                });
            }
            interaction.reply("L'anti compte récent a bien été activé !");
        } else if (mode === "off") {
            const query = await guild.findOne({
                where: { guild_id: interaction.guild.id },
            });
            if (!query) {
                await guild.create({
                    guild_id: interaction.guild.id,
                    welcome_recent: false,
                });
            } else {
                await query.update({
                    welcome_recent: false,
                });
            }
            interaction.reply("L'anti compte récent a bien été désactivé !");
        }
    },
};