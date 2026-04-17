const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  category: "Information",
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Voir la liste des commandes disponibles !"),

  async execute(client, interaction) {
    var help = new MessageEmbed()
      .setThumbnail(client.user.avatarURL())
      .setAuthor({ name: "❔ - Help Avox", iconURL: client.user.avatarURL() })
      .setColor("#3b9aff")
      .setDescription(
        "**Voici la liste des commandes disponibles : (MODIFICATION)**"
      )
      .addField(":tada: **Fun**", "`love, 8ball, ascii, tweet, clyde, eject`")
      .addField(
        "<a:modo:731140709477777470> **Modération**",
        "`ban, nuke, clear, kick, raidmode`"
      )
      .addField(
        "<a:newspaper:731541829597659218> **Utilitaire**",
        "`encode_decode, qrcode, shorturl, calc`"
      )
      .addField(
        ":camera_with_flash: **Image**",
        "`animal, hug, kiss, nasa, avatar, pixelate, cry, slap, punch`"
      )
      .addField(
        "<:bchercher:756807679044878397> **Information**",
        "`serveurinfo, help, userinfo, botinfo, ping, invite, weather`"
      )
      //.addField("<:boutil:756808170390945845> **Configuration**","`welcome, setWelcome, welcome-active | color-bump, bump-desc`")
      //.addField("<:bmoney:756806902754705440> **Economy**", "`money, daily, work ..In Developpement`")
      .addField(
        "<:boutil:756808170390945845> **Owner**",
        "`eval, exit, serverlist` "
      )
      .setFooter({
        text: interaction.user.username,
        iconURL: interaction.user.avatarURL({ dynamic: true }),
      });

    interaction.reply({ embeds: [help] });
  },
};
