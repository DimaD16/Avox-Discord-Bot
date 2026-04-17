const Discord = require("discord.js");
const fs = require("fs");
const snekfecth = require("snekfetch");
const Canvas = require("canvas");
const guild = require("../models/guild.js");
Canvas.registerFont("fedoka.ttf", {
  family: "FredokaOne",
  weight: "normal",
  style: "normal",
});

module.exports = {
  name: "guildMemberAdd",

  async execute(member) {
    const result = await guild.findOne({
      where: { guild_id: member.guild.id },
    });

    if (!result) {
      return;
    }

    if (result.dataValues.welcome_raidmode) {
      reason = "AVOX Raidmode ON";
      return member
        .kick(reason)
        .then(
          member.send(
            `⚠️ Le serveur \`${member.guild.name}\` est en mode Raidmode ! `
          )
        );
    } else if (result.dataValues.welcome_recent) {
      let x = Date.now() - member.user.createdAt;
      let created = Math.floor(x / 86400000);
      if (parseInt(created) < parseInt(7)) {
        member
          .kick("AVOX Anti recent account")
          .then(member.send("Vous avez été kick pour avoir un compte récent."));
        return;
      }
    }

    if (result.dataValues.welcome_active === null) return;

    if (result.dataValues.welcome_active === "false") return;

    if (result.dataValues.welcome_type === "message") {
      const re = result.dataValues.welcome_message
        .replace(/{user.username}/g, member.user.username)
        .replace(/{user.mention}/g, member.user)
        .replace(/{user.tag}/g, member.user.tag)
        .replace(/{user.id}/g, member.user.id)
        .replace(/{user.create}/g, member.user.createdAt)
        .replace(/{serveur.name}/g, member.guild.name)
        .replace(/{serveur.id}/g, member.guild.id)
        .replace(/{membercount}/g, member.guild.memberCount);

      client.guilds.cache
        .get(result.dataValues.guild_id)
        .channels.cache.get(result.dataValues.welcome_channel)
        .send(re)
        .catch((err) => {
          if (err) {
            return;
          }
        });
    } else {
      const canvas = Canvas.createCanvas(1024, 500);
      const ctx = canvas.getContext("2d");
      const background = await Canvas.loadImage(
        "https://dbdzm869oupei.cloudfront.net/img/alfombretaratoli/preview/21281.png"
      );

      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      const avatar = await Canvas.loadImage(
        member.user.displayAvatarURL({ format: "png", size: 1024 })
      );

      // rectangle invisible with outline

      ctx.font = "bold 70px FredokaOne";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Bienvenue", 512, 350);

      //display username under the avatar
      ctx.font = "bold 50px FredokaOne";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(member.user.tag, 512, 410);

      ctx.font = "bold 35px FredokaOne";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        `Vous étes le ${member.guild.memberCount}ème membre !`,
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
        `bienvenue-${member.user.id}.png`
      );

      client.guilds.cache
        .get(result.dataValues.guild_id)
        .channels.cache.get(result.dataValues.welcome_channel)
        .send({ files: [attachment] })
        .catch((err) => {
          if (err) {
            return;
          }
        });
    }
  },
};

/*  if (result.dataValue.welcome_character) {
           const rename = member.user.username.replace(/[^a-zA-Z0-9 ]/g, "");
           if (rename.length === 0) {
             member.setNickname(`NICK_WITH_CHARACTER_${member.user.id}`);
           } else {
             member.setNickname(rename);
           } */
