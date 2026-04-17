const { MessageEmbed, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
fetch = require("node-fetch");

module.exports = {
  category: "Utile",
  data: new SlashCommandBuilder()
    .setName("shorturl")
    .setDescription("Permet de raccourcir une URL.")
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("Une url pour la raccourcir.")
        .setRequired(true)
    ),

  async execute(client, interaction) {
    const url = interaction.options.getString("url");
    const res = await fetch(
      encodeURI(`https://is.gd/create.php?format=simple&url=${url}`)
    );
    const body = await res.text();

    if (body === "Erreur : Veuillez saisir une URL valide pour raccourcir") {
      return interaction.reply({
        content: "Merci de mettre un lien valide !",
        ephemeral: true,
      });
    }

    if (
      body ===
      "Error: Sorry, the URL you entered is on our internal blacklist. It may have been used abusively in the past, or it may link to another URL redirection service."
    ) {
      return interaction.reply({
        content:
          "Erreur : Désolé, l'URL que vous avez saisie figure sur notre liste noire interne. Il peut avoir été utilisé de manière abusive dans le passé, ou il peut être lié à un autre service de redirection d'URL.",
        ephemeral: true,
      });
    }

    const embed = new MessageEmbed()
      .setTitle("Voici ton lien raccourci : ")
      .setDescription(`Lien : ${url}\nRaccourci : ${body}`);

    interaction.reply({ embeds: [embed] });
  },
};
