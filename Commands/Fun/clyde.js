const { MessageEmbed, Collection, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
fetch = require("node-fetch");

module.exports = {
  category: "Fun",
  data: new SlashCommandBuilder()
    .setName("clyde")
    .setDescription(
      "Vous avez la possibilité maintenant de faire parler clyde !"
    )
    .addStringOption((option) =>
      option
        .setName("texte")
        .setDescription("Un text pour faire parler clyde.")
        .setRequired(true)
    ),

  async execute(client, interaction) {
    const string = interaction.options.getString("texte");

    const res = await fetch(
      encodeURI(`https://nekobot.xyz/api/imagegen?type=clyde&text=${string}`)
    );
    const json = await res.json();
    const attachment = new MessageAttachment(json.message, "clyde.png");

    interaction.reply({ files: [attachment] });
  },
};
