const { MessageEmbed, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  category: "Information",
  data: new SlashCommandBuilder()
    .setName("serveurinfo")
    .setDescription("Affiche les informations du serveur."),

  async execute(client, interaction) {
    const embed = new MessageEmbed()
      .setThumbnail(
        interaction.guild.iconURL({ dynamic: true }).setColor("#3b9aff")
      )
      .setAuthor({
        name: "Voici les infos du serveur :",
        iconURL: interaction.guild.iconURL({ dynamic: true }),
      })
      .addField(
        "<:AActivity:773235016745615401> Nom du serveur :",
        interaction.guild.name
      )
      .addField(
        "<:Identifiant:773235467348213800> Identifiant :",
        interaction.guild.id
      )
      .addField("<:AcrownD:770218444267323432> Propriétaire :", "ok")
      .addField(
        `<:Boost:769860286584061952> Boost :`,
        `${interaction.guild.premiumSubscriptionCount}`
      )
      .addField(
        "<:AFriends:770217555775324204> Rôles :",
        `${interaction.guild.roles.cache.size}`
      )
      .addField(
        "<:Asalon:773238480360439818> Salons :",
        `${interaction.guild.channels.cache.size}`
      )
      .addField(
        "<:Aemoji:773238759722450995> émojis :",
        `${interaction.guild.emojis.cache.size}`
      )
      .addField(
        "<:Aparameters:773239805316038657> Niveaux de verification :",
        `${interaction.guild.verificationLevel}`
      )
      .addField(
        "<:Apingler:773240011402379264> Serveur crée le :",
        `${interaction.guild.createdAt}`
      )
      .addField(
        "Arrière plan-d'invitation :",
        `${
          interaction.guild.splashURL()
            ? `[clique-ici](${interaction.guild.splashURL()})`
            : "<a:croix:772188062234181655>"
        }`,
        true
      )
      .addField(
        "Bannière :",
        `${
          interaction.guild.bannerURL()
            ? `[clique-ici](${interaction.guild.bannerURL()})`
            : "<a:croix:772188062234181655>"
        }`,
        true
      )
      .addField(
        "URL Personnalisée :",
        `${
          interaction.guild.vanityURLCode
            ? `https://discord.gg/${interaction.guild.vanityURLCode}`
            : "<a:croix:772188062234181655>"
        }`,
        true
      )
      .setFooter({
        text: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  },
};
