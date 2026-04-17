const { MessageEmbed, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  category: "Utile",
  data: new SlashCommandBuilder()
    .setName("qrcode")
    .setDescription("Générer un QR Code !")
    .addStringOption((option) =>
      option
        .setName("link")
        .setDescription("Le texte ou l'url à générer.")
        .setRequired(true)
    ),

  async execute(client, interaction) {
    const text = interaction.options.getString("link");

    const link = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text.replace(
      new RegExp(" ", "g"),
      "%20"
    )}`;
    const embed = new MessageEmbed()
      .setTitle(`Text/Link : ${text}\n`)
      .setDescription(
        `**_[L'image ne se charge pas ? Cliquez-ici !](${link})_**`
      )
      .setImage(link);

    interaction.reply({ embeds: [embed] });
  },
};
