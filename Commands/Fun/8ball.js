const { MessageEmbed, Collection } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  category: "Fun",
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("Savoir la verité sur tout.")
    .addStringOption((option) =>
      option
        .setName("questions")
        .setDescription("Une question pour que le bot y réponde.")
        .setRequired(true)
    ),

  async execute(client, interaction) {
    let replies = [
      "C'est sur.",
      "Non",
      "oui !",
      "oui, j'en suis certain !",
      "Peut-être",
      "Mieux vaut ne pas te le dire maintenant...",
      "mais ct sur enft !!!!!",
      "je veut pas te decévoir. :confused:",
      "comment ça ??",
    ];
    let res = Math.floor(Math.random() * replies.length);

    interaction.reply({
      content: `<:8Ball_Pool:720950435858350103> **${interaction.user}**, ${replies[res]}`,
    });
  },
};
