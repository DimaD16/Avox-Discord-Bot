const { MessageEmbed, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  category: "image",
  data: new SlashCommandBuilder()
    .setName("slap")
    .setDescription("Frapper une personne.")
    .addUserOption((option) =>
      option.setName("user").setDescription("Un utilisateur pour le frapper.")
    ),

  async execute(client, interaction) {
    const user = interaction.options.getUser("user");

    const res = await fetch(encodeURI(`https://neko-love.xyz/api/v1/punch`));
    const json = await res.json();

    const he = new MessageEmbed()
      .setAuthor({
        name: `${interaction.user.username} frappe ${
          user ? user.username : "Avox"
        }`,
      })
      .setImage(json.url, "frappe.png");

    interaction.reply({ embeds: [he] });
  },
};
