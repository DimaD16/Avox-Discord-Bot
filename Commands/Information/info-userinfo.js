const {
  MessageEmbed,
  Collection,
  MessageAttachment,
  Interaction,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const moment = require("moment");
const flags = {
  DISCORD_EMPLOYEE: "<:BadgeDiscordStaff:777182532508712980>",
  PARTNERED_SERVER_OWNER: "<:BadgeDiscordPartner:777182481110925333>",
  BUGHUNTER_LEVEL_1: "<:BadgeDiscordBugHunter:777182394259734558>",
  BUGHUNTER_LEVEL_2: "<:BadgeDiscordBugHunterGold:777182334246977538>",
  HYPESQUAD_EVENTS: "<:BagdeHypeSquadEvents:777178753905328129>",
  HOUSE_BRAVERY: "<:BagdeHypeSquadBravery:777178287600173126>",
  HOUSE_BRILLIANCE: "<:BadgeHypeSquadBrilliance:777182163555844116>",
  HOUSE_BALANCE: "<:BagdeHypeSquadBallane:777178499773235200>",
  EARLY_SUPPORTER: "<:BadgeEarlySupporter:777182504931033148>",
  TEAM_USER: "<:BadgeHypeSquadOnline:777182559171379210>",
  SYSTEM:
    "<:BadgeSysteme2:777190163984941107><:BadgeSysteme1:777190534548422707>",
  VERIFIED_BOT:
    "<:BadgeBotCertified1:783387687419772989><:BadgeBotCertified2:783387781811929171>",
  EARLY_VERIFIED_DEVELOPER: "<:tscript:721709983317622844>",
};
const deprecated = ["DISCORD_PARTNER", "VERIFIED_DEVELOPER"];

module.exports = {
  category: "Information",
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Affiche les informations d'un utilisateur.")
    .addUserOption((option) =>
      option
        .setName("utilisateur")
        .setDescription("Un utilisateur pour afficher ses informations.")
    ),

  async execute(client, interaction) {
    const target = interaction.options.getUser("utilisateur");

    let displayPresence = false;

    var user;
    if (!target) {
      user = interaction.user;
    }
    if (target) {
      user = target;
    }

    if (!user) {
      return interaction.reply("Je ne trouve pas l'utilisateur..");
    }

    let member = null;
    if (interaction.guild) {
      member = await interaction.guild.members.fetch(user).catch(() => {});
    }

    const userFlags = user.flags
      ? user.flags.toArray().filter((flag) => !deprecated.includes(flag))
      : [];
    const str1 = `${user.avatar}`;
    const embed = new MessageEmbed()
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .addField("<:Amembers:770219180384321576> Pseudo :", user.tag)
      .addField("<:AIdentifiant:773235467348213800> Identifiant :", user.id)
      .addField(
        `<:IconChannelNitro:783684238209187891> Badge :`,
        `${
          userFlags.length
            ? userFlags.map((flag) => flags[flag]).join(" ")
            : "Aucun"
        } ${str1.startsWith("a_") ? "<:BadgeNitro:777182585901547530>" : ""}`
      )
      .addField(
        "<:Apingler:773240011402379264> Création du compte :",
        moment.utc(user.createdAt).format("DD/MM/YYYY h:mm A")
      );

    if (displayPresence) {
      embed
        .addField(
          "<:AActivity:773235016745615401> Jeu :",
          user.presence.activity ? user.presence.activity.name : "Pas de jeu.."
        )
        .addField(
          "<:status:783685549511671819> Status :",
          user.presence.status
        );
    }

    if (member) {
      embed
        .addField(
          "<:AFriends:770217555775324204> Date d'arrivée:",
          moment.utc(member.joinedAt).format("DD/MM/YYYY h:mm A")
        )
        .addField(
          `<:roles:783684905464102913> Rôles :`,
          member.roles.size > 10
            ? member.roles.cache
                .map((r) => r)
                .slice(0, 9)
                .join(", ") +
                " " +
                `Et plein d'autre..(${member.roles.cache.size - 10})`
            : member.roles.cache.size < 1
            ? "Aucun rôles"
            : member.roles.cache.map((r) => r).join(", ")
        )
        .setColor(member.displayHexColor)
        .addField(
          "Surnom :",
          member.nickname ? member.nickname : "Pas de surnom..."
        );
    }

    interaction.reply({ embeds: [embed] });
  },
};
