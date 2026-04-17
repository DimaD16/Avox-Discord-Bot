const { MessageEmbed, MessageAttachment, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  category: "Image",
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription(
      "Effacer les messages d'un utilisateur ou de tout le monde !"
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("user")
        .setDescription("Effacer les messages d'un utilisateur.")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("L'utilisateur à qui on veut effacer les messages.")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("number")
            .setDescription("Le nombre de messages à supprimer.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("all")
        .setDescription("Effacer les messages de tout le monde.")
        .addIntegerOption((option) =>
          option
            .setName("number")
            .setDescription("Le nombre de messages à supprimer.")
            .setRequired(true)
        )
    ),

  async execute(client, interaction) {
    const user = interaction.options.getUser("user");
    const number = interaction.options.getInteger("number");

    if (
      !interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)
    ) {
      return interaction.reply(
        "Je n'ai pas la permission de supprimer les messages."
      );
    }

    if (interaction.options.getSubcommand() === "user") {
      try {
        const messages = await interaction.channel.messages.fetch({
          limit: number,
        });
        const filtered = messages.filter((m) => m.author.id === user.id);
        if (filtered.size === 0) {
          interaction.reply(
            "Aucun message de cet utilisateur n'a été trouvé !"
          );
          return;
        }
        try {
          const mess = await interaction.reply(
            `Suppression de ${filtered.size} messages de ${user.tag}...`
          );
          await interaction.channel.bulkDelete(filtered);
          await interaction.deleteReply();
        } catch (err) {
          return interaction.reply(
            "Une erreur est survenue lors de la suppression des messages."
          );
        }
        const message = await interaction.channel.send(
          `${filtered.size} messages de ${user.username} ont été supprimés !`
        );
        wait(4000).then(() => message.delete());
      } catch (err) {
        return interaction.reply("Le nombre fourni est négatif.");
      }
    } else {
      const messages = await interaction.channel.messages.fetch({
        limit: number,
      });

      if (messages.size === 0) {
        interaction.reply("Aucun message n'a été trouvé !");
        return;
      }

      try {
        await interaction.reply("Suppression en cours...");
        await interaction.channel.bulkDelete(messages);
        await interaction.deleteReply();
      } catch (err) {
        return interaction.reply(
          "Une erreur est survenue lors de la supression des messages."
        );
      }
      const message = await interaction.channel.send(
        `${messages.size} messages ont été supprimés !`
      );
      await wait(4000);
      message.delete();
    }
  },
};
