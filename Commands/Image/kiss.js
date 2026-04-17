const { MessageEmbed, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
fetch = require("node-fetch");

module.exports = {
  category: "Image",
  data: new SlashCommandBuilder()
    .setName("kiss")
    .setDescription("Kiss !")
    .addUserOption((option) =>
      option.setName("user").setDescription("Un utilisateur pour le bisou !")
    ),

  async execute(client, interaction) {
    const user = interaction.options.getUser("user");

    const res = await fetch(encodeURI(`https://nekos.life/api/v2/img/kiss`));
    const json = await res.json();

    const he = new MessageEmbed()
      .setAuthor({
        name: `${interaction.user.username} fait un kiss à ${
          user ? user.username : "Avox"
        }`,
      })
      .setImage(json.url, "kiss.png");

    interaction.reply({ embeds: [he] });
  },
};
