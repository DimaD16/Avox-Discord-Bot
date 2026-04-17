const { MessageEmbed, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Canvas = require("canvas");

module.exports = {
  category: "image",
  data: new SlashCommandBuilder()
    .setName("pixelate")
    .setDescription("Pixelate une imageok.")
    .addUserOption((option) =>
      option.setName("user").setDescription("Un lien d'une image.")
    ),

  async execute(client, interaction) {
    const user = interaction.options.getUser("user");

    const image = user
      ? user.avatarURL({ size: 1024, format: "png" })
      : interaction.user.avatarURL({ size: 1024, format: "png" });

    const imageok = await Canvas.loadImage(image);

    const canvas = Canvas.createCanvas(imageok.width, imageok.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(imageok, 0, 0);

    let pixelArr = ctx.getImageData(0, 0, imageok.width, imageok.height).data;
    let sample_size = 15;

    for (let y = 0; y < imageok.height; y += sample_size) {
      for (let x = 0; x < imageok.width; x += sample_size) {
        let p = (x + y * imageok.width) * 4;

        ctx.fillStyle =
          "rgba(" +
          pixelArr[p] +
          "," +
          pixelArr[p + 1] +
          "," +
          pixelArr[p + 2] +
          "," +
          pixelArr[p + 3] +
          ")";
        ctx.fillRect(x, y, sample_size, sample_size);
      }
    }

    const attachment = new MessageAttachment(canvas.toBuffer(), "pixelate.png");
    interaction.reply({ files: [attachment] });
  },
};
