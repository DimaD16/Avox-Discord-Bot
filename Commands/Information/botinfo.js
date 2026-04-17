const {
  MessageEmbed,
  Collection,
  MessageAttachment,
  version,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const os = require("os");
const moment = require("moment");

module.exports = {
  category: "Bot",
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Affiche les informations du bot."),

  async execute(client, interaction) {
    let botembed = new MessageEmbed()
      .setTitle("Infos du bot")
      .setThumbnail(client.user.avatarURL())
      .setColor("#3b9aff")
      .addField(
        "<:AFriends:770217555775324204> Pseudo :",
        client.user.tag,
        true
      )
      .addField(`<:boutil:756808170390945845> Devellopeur :`, `Dima`, true)
      .addField(
        `<:Apingler:773240011402379264> Bot crée le :`,
        moment.utc(client.user.createdAt).format("DD/MM/YYYY h:mm A"),
        true
      )
      .addField(
        "<:Linux:790703605626830898> Systeme d'exploitation :",
        process.platform,
        true
      )
      .addField(`<:Arch:790703950038171688> Architecture :`, process.arch, true)
      .addField(
        `<:Resources:790703240190230569> Ressources utilisées :`,
        `204.9 MB`,
        true
      )
      .addField(`<:Library:790702704611426374> Library:`, `Discord.js`, true)
      .addField(
        `<:djs:790701785253806092> Version Discord.js :`,
        `v${version}`,
        true
      )
      .addField(
        `<:Nodejs:790704113771741224> Version Node :`,
        process.version,
        true
      )
      .addField(
        `<:Astats:770220787160055818> Serveurs`,
        client.guilds.cache.size.toLocaleString(),
        true
      )
      .addField(
        `<:Amembers:770219180384321576> Membres :`,
        client.guilds.cache
          .reduce((a, b) => a + b.memberCount, 0)
          .toLocaleString(),
        true
      )
      .addField(
        `<:Asalon:773238480360439818> Salons :`,
        client.channels.cache.size.toLocaleString(),
        true
      )
      .addField(
        `<:Aparameters:773239805316038657> Uptime :`,
        duration(client.uptime)
      );

    interaction.reply({ embeds: [botembed] });

    function duration(ms) {
      const sec = Math.floor((ms / 1000) % 60).toString();
      const min = Math.floor((ms / (1000 * 60)) % 60).toString();
      const hrs = Math.floor(ms / (1000 * 60 * 60)).toString();
      return `**${hrs.padStart(2, "0")} ** heure(s), ** ${min.padStart(
        2,
        "0"
      )} ** minute(s), ** ${sec.padStart(2, "0")} ** seconde(s).`;
    }
  },
};
