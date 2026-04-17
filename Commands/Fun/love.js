const { MessageEmbed, Collection, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
//const Canvas = require("canvas");

module.exports = {
  category: "Fun",
  data: new SlashCommandBuilder()
    .setName("love")
    .setDescription("Evaluer le taux d'amour entre deux personnes.")
    .addUserOption((option) =>
      option
        .setName("utilisateur")
        .setDescription("Un utilisateur pour évaluer le taux d'amour.")
        .setRequired(true)
    ),

  async execute(client, interaction) {
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext("2d");

    const target = interaction.options.getUser("utilisateur");

    const avatar = await Canvas.loadImage(
      interaction.user.displayAvatarURL({ format: "png" })
    );
    ctx.drawImage(avatar, 100, 25, 200, 200);

    const TargetAvatar = await Canvas.loadImage(
      target.displayAvatarURL({ format: "png" })
    );
    ctx.drawImage(TargetAvatar, 400, 25, 200, 200);

    const heart = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/716216765448978504/858607217728159744/unknown.png"
    );
    const broken = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/716216765448978504/858607537238179840/unknown.png"
    );
    const random = Math.floor(Math.random() * 99) + 1;

    if (random >= 50) {
      ctx.drawImage(heart, 275, 60, 150, 150);
      const attachment = new MessageAttachment(canvas.toBuffer(), "love.png");

      return interaction.reply({
        content: `ㅤㅤㅤㅤㅤㅤ**${interaction.user.username}** + **${target.username}** = **${random}%**`,
        files: [attachment],
      });
    } else {
      ctx.drawImage(broken, 275, 60, 150, 150);
      const attachment = new MessageAttachment(canvas.toBuffer(), "broken.png");

      return interaction.reply({
        content: `ㅤㅤㅤㅤㅤ  **${interaction.user.username} + **${target.username}** = **${random}%**`,
        files: [attachment],
      });
    }
  },
};
