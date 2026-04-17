const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  category: "Bot",
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Inviter le bot sur votre serveur !"),

  async execute(client, interaction) {
    const embed = new MessageEmbed()
      .setColor("#3b9aff")
      .setAuthor({
        name: "Voici les liens utiles d'Avox :",
        iconURL: client.user.avatarURL(),
      });

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("➕ Invite")
        .setStyle("LINK")
        .setURL(
          "https://discord.com/api/oauth2/authorize?client_id=714452126574706720&permissions=8&scope=bot%20applications.commands"
        )
        .setDisabled(false),

      new MessageButton()
        .setLabel("📞 Support")
        .setStyle("LINK")
        .setURL("https://discord.gg/mqeXqp7yVE")
        .setDisabled(false)
    );

    interaction.reply({
      embeds: [embed],
      components: [row],
    });
  },
};
