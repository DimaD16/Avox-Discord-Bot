const figlet = require("figlet");
const { MessageEmbed, Collection } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  category: "Fun",
  data: new SlashCommandBuilder()
    .setName("ascii")
    .setDescription("Mettre un texte en ascii.")
    .addStringOption((option) =>
      option
        .setName("texte")
        .setDescription("Un texte pour le mettre en ascii.")
        .setRequired(true)
    ),

  async execute(client, interaction) {
    const string = interaction.options.getString("texte");

    if (string.length > 25) {
      return interaction.reply("Le texte est trop long !");
    }

    figlet(string, (err, data) => {
      interaction.reply(`\`\`\`${data}\`\`\``);
    });
  },
};
