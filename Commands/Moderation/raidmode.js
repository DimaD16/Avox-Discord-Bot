const { MessageEmbed, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const guild = require("../../models/guild.js");

module.exports = {
  category: "Modération",
  data: new SlashCommandBuilder()
    .setName("raidmode")
    .setDescription("Active le raidmode !")
    .addStringOption((option) =>
      option
        .setName("mode")
        .setDescription("Le mode du raidmode.")
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
          raidmode: true,
        });
      } else {
        await query.update({
          raidmode: true,
        });
      }
      interaction.reply("Le raidmode a bien été activé !");
    } else if (mode === "off") {
      const query = await guild.findOne({
        where: { guild_id: interaction.guild.id },
      });
      if (!query) {
        await guild.create({
          guild_id: interaction.guild.id,
          raidmode: false,
        });
      } else {
        await query.update({
          raidmode: false,
        });
      }
      interaction.reply("Le raidmode a bien été désactivé !");
    }
  },
};
