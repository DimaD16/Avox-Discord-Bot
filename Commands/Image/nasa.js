const { MessageEmbed, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
fetch = require("node-fetch");

module.exports = {
  category: "Image",
  data: new SlashCommandBuilder()
    .setName("nasa")
    .setDescription("NASA Image du jour !"),

  async execute(client, interaction) {
    const res = await fetch(
      encodeURI(
        `https://api.nasa.gov/planetary/apod?api_key=/////////////////////////////////////////////`
      )
    );
    const json = await res.json();

    const embed = new MessageEmbed()
      .setThumbnail(
        "https://graphiste.com/blog/wp-content/uploads/2019/08/1920px-NASA_logo.svg-e1567160347263.png"
      )
      .setTitle(`${json.title}`)
      .setColor("#00008B")
      .setURL(json.hdurl)
      .setDescription(json.explanation)
      .setImage(json.hdurl)
      .setFooter({
        text: `${json.copyright ? json.copyright : "Anonyme"} | ${
          json.date
        } | api.nasa.gov`,
        iconURL: interaction.user.avatarURL({ dynamic: true }),
      });

    console.log(json);
    interaction.reply({ embeds: [embed] });
  },
};
