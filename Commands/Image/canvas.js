const { MessageEmbed, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
//const Canvas = require("canvas");

module.exports = {
  category: "Modération",
  data: new SlashCommandBuilder()
    .setName("canvas")
    .setDescription("Crée un canvas !"),

  async execute(client, interaction) {
    const canvas = Canvas.createCanvas(1024, 500);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage(
      "https://dbdzm869oupei.cloudfront.net/img/alfombretaratoli/preview/21281.png"
    );

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const avatar = await Canvas.loadImage(
      interaction.user.displayAvatarURL({ format: "png", size: 1024 }))
    
    // rectangle invisible with outline
    
    ctx.font = "bold 70px FredokaOne";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(
      "Bienvenue",
      512,
      350
    );

    //display username under the avatar
    ctx.font = "bold 50px FredokaOne";
    ctx.fillStyle = "white";
    ctx.textAlign = 'center';
    ctx.fillText(
      interaction.user.tag,
      512,
      410
    );

    ctx.font = "bold 35px FredokaOne";
    ctx.fillStyle = "white";
    ctx.textAlign = 'center';
    ctx.fillText(
      `Vous étes le ${interaction.guild.memberCount}ème membre !`,
      512,
      460
    );

    //arc with outline color
    ctx.beginPath();
    ctx.arc(512, 166, 119, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(avatar, 393, 47, 238, 238);

    const attachment = new MessageAttachment(
      canvas.toBuffer(),
      `bienvenue-${interaction.user.id}.png`
    );

    interaction.reply({ files: [attachment] });
  },
};
