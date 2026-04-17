const { MessageEmbed, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
fetch = require("node-fetch");

module.exports = {
  category: "Image",
  data: new SlashCommandBuilder()
    .setName("cry")
    .setDescription("Cry !")
    .addUserOption((option) =>
      option.setName("user").setDescription("L'utilisateur qui pleure.")
    ),

  async execute(client, interaction) {
    const user = interaction.options.getUser("user");

    const res = await fetch(encodeURI(`https://neko-love.xyz/api/v1/cry`));
    const json = await res.json();

    const he = new MessageEmbed()
      .setAuthor({
        name: `${user ? user.username : interaction.user.username} Pleure :'(`,
      })
      .setImage(json.url, "cry.png");

    interaction.reply({ embeds: [he] });
  },
};
