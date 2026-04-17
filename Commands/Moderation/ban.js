const { MessageEmbed, Collection, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Pouvoir ban un utilisateur.")
    .addUserOption((option) =>
      option
        .setName("utilisateur")
        .setDescription("Mentionne un utilisateur pour pouvoir le ban.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("raison")
        .setDescription("Une raison pour le ban.")
        .setRequired(false)
    ),

  async execute(client, interaction) {
    if (!interaction.member.permissions.has("BAN_MEMBERS"))
      return interaction.reply({
        content: "Tu n'a pas la permission d'utiliser cette commande.",
        ephemeral: true,
      });

    const user = interaction.options.getUser("utilisateur");
    const member =
      interaction.guild.members.cache.get(user.id) ||
      (await interaction.guild.members.fetch(user.id).catch((err) => {}));

    if (!member)
      return interaction.reply("Je ne peut pas trouver cet utilisateur.");
    const reason = interaction.options.getString("raison");

    if (!member.bannable || member.user.id === client.user.id)
      return interaction.reply("Je ne peut pas ban cette personne.");

    if (
      interaction.member.roles.highest.position <= member.roles.highest.position
    )
      return interaction.reply(
        "L'utilisateur à le même ou supérieur au rôle de l'utilisateur ban."
      );

    if (!member.bannable)
      return interaction.reply("Je ne peut pas bannir cet utilisateur");

    const embed = new MessageEmbed()
      .setDescription(
        `**${member.user.tag}** est banni du serveur pour \`${
          reason ? reason : "none"
        }\``
      )
      .setColor("#ff0000")
      .setTimestamp();

    await member.user.send(
      `Vous étes banni de **\`${interaction.guild.name}\`** pour \`${
        reason ? reason : "none"
      }\``
    );
    member.ban({
      reason: `AVOX BAN COMMAND | Reason : ${reason ? reason : "none"}`,
    });

    return interaction.reply({ embeds: [embed] });
  },
};
