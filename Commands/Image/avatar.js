const { MessageEmbed, Collection } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  category: "Information",
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Voir ta photo de profil ou celle de quelqu'un.")
    .addUserOption((option) =>
      option
        .setName("utilisateur")
        .setDescription("Choisir un utilisateur")
        .setRequired(true)
    ),

  async execute(client, interaction) {
    const user = interaction.options.getUser("utilisateur");

    const embed = new MessageEmbed()
      .setTitle(
        `<:Amembers:770219180384321576> L'avatar de ${user.username} est :`
      )
      .setImage(
        user.displayAvatarURL({
          size: 1024,
          dynamic: true,
        })
      );

    interaction.reply({ embeds: [embed] });
  },
};
