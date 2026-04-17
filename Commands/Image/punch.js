const { MessageEmbed, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
fetch = require("node-fetch");

module.exports = {
  category: "Image",
  data: new SlashCommandBuilder()
    .setName("punch")
    .setDescription("Donner un coup de poing à un utilisateur !")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("L'utilisateur à qui on veut donner un coup de poing")
    ),

  async execute(client, interaction) {
    const user = interaction.options.getUser("user");

    const res = await fetch(encodeURI(`https://neko-love.xyz/api/v1/punch`));
    const json = await res.json();

    const he = new MessageEmbed()
      .setAuthor({
        name: `${interaction.user.username} donne un coup à ${
          user ? user.username : "Avox"
        }`,
      })
      .setImage(json.url, "punch.png");

    interaction.reply({ embeds: [he] });
  },
};
