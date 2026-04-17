const {
  MessageEmbed,
  Collection,
  MessageAttachment,
  Interaction,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
fetch = require("node-fetch");

module.exports = {
  category: "Fun",
  data: new SlashCommandBuilder()
    .setName("tweet")
    .setDescription("Tweeter un message. (Fake)")
    .addStringOption((option) =>
      option
        .setName("utilisateur")
        .setDescription("Un utilisateur pour tweeter un message.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Un message à tweeter.")
        .setRequired(true)
    ),

  async execute(client, interaction) {
    const target = interaction.options.getString("utilisateur");
    const message = interaction.options.getString("message");

    // if target lenght > 33 return
    if (target.length > 33) {
      return interaction.reply("Le nom d'utilisateur est trop long.");
    }

    // if message lenght > 31 return
    if (message.length > 31) {
      return interaction.reply("Le message est trop long.");
    }

    const res = await fetch(
      encodeURI(
        `https://nekobot.xyz/api/imagegen?type=tweet&username=${target}&text=${message}`
      )
    );
    const json = await res.json();
    const attachment = new MessageAttachment(json.message, "tweet.png");

    interaction.reply({ files: [attachment] });
  },
};
