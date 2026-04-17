const { MessageEmbed, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  category: "Image",
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick un utilisateur du serveur !")
    .addUserOption((option) =>
      option
        .setName("utilisateur")
        .setDescription("L'utilisateur à kick.")
        .setRequired(true)
    ),

  async execute(client, interaction) {
    if (!interaction.member.permissions.has("KICK_MEMBERS"))
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
      return interaction.reply("Je ne peut pas kick cette utilisateur");

    if (
      interaction.member.roles.highest.position <= member.roles.highest.position
    )
      return interaction.reply(
        "L'utilisateur à le même ou supérieur au rôle de l'utilisateur kick."
      );

    const embed = new MessageEmbed()
      .setDescription(
        `**${member.user.tag}** est kick du serveur pour \`${
          reason ? reason : "none"
        }\``
      )
      .setColor("#ff0000")
      .setTimestamp();

    await member.user.send(
      `Vous étes kick de **\`${interaction.guild.name}\`** pour \`${
        reason ? reason : "none"
      }\``
    );
    member.kick({
      reason: `AVOX KICK COMMAND | Reason : ${reason ? reason : "none"}`,
    });

    return interaction.reply({ embeds: [embed] });
  },
};
