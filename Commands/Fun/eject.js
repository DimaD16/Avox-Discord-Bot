const { MessageEmbed, Collection, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
fetch = require("node-fetch");
//const Canvas = require("canvas");

module.exports = {
  category: "Fun",
  data: new SlashCommandBuilder()
    .setName("eject")
    .setDescription("Vous pouvez éjecter (Among us) quelqu'un !")
    .addUserOption((option) =>
      option
        .setName("utilisateur")
        .setDescription("Un utilisateur pour l'éjecter")
        .setRequired(true)
    )

    .addStringOption((option) =>
      option
        .setName("couleur")
        .setDescription("La couleur de l'éjecteur")
        .addChoice("noir", "black")
        .addChoice("Bleu", "blue")
        .addChoice("Marron", "brown")
        .addChoice("Bleu clair", "cyan")
        .addChoice("Vert", "green")
        .addChoice("Vert clair", "lightgreen")
        .addChoice("Orange", "orange")
        .addChoice("Rose", "pink")
        .addChoice("Viollet", "purple")
        .addChoice("Rouge", "red")
        .addChoice("blanc", "white")
        .addChoice("Jaune", "yellow")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("imposteur")
        .setDescription("Imposteur ?")
        .setRequired(true)
    ),

  async execute(client, interaction) {
    const user = interaction.options.getUser("utilisateur");
    const color = interaction.options.getString("couleur");
    const imposteur = interaction.options.getBoolean("imposteur");

    const canvas = Canvas.createCanvas(1920, 1080);
    const ctx = canvas.getContext("2d");

    const back = await Canvas.loadImage(
      "https://static.wikia.nocookie.net/among-us-wiki/images/2/27/Space.png/revision/latest?cb=20201014232555"
    );
    ctx.drawImage(back, 0, 0, 1920, 1080);

    var t;
    if (imposteur) {
      t = "was An Imposter";
    } else {
      t = "was not An Imposter";
    }

    ctx.font = "65px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(
      `${user ? user.username : interaction.user.username} ${t}`,
      580,
      550
    );

    const dir = `Amongus/${color}.png`;
    const image = await Canvas.loadImage(`${dir}`);
    ctx.drawImage(image, 400, 450, 154, 191);

    const attachment = new MessageAttachment(canvas.toBuffer(), "eject.png");
    interaction.reply({ files: [attachment] });
  },
};
