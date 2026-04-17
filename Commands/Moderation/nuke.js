const cooldowns = new Map();
const humanizeDuration = require("humanize-duration");
const {
  MessageEmbed,
  Collection,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const moment = require("moment");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nuke")
    .setDescription("Supprimer tous les messages d'un salon."),

  async execute(client, interaction) {
    const cooldown = cooldowns.get(interaction.guild.id);
    if (cooldown) {
      const remaining = humanizeDuration(cooldown - Date.now(), {
        round: true,
      });
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setTitle("<a:croix:772188062234181655> Ho non..")
            .setDescription(`Vous pouvez nuke un channel dans ${remaining}`)
            .setFooter({
              text: interaction.user.username,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp(),
        ],
        ephemeral: true,
      });
    }

    if (!interaction.member.permissions.has("BAN_MEMBERS")) {
      return interaction.reply("Vous n'avez pas la permission !");
    }
    if (!interaction.guild.me.permissions.has("BAN_MEMBERS")) {
      return interaction.reply("Je n'est pas la permission !");
    }

    const nuke = interaction.channel;

    if (!nuke.deletable)
      return interaction.reply.send("Je ne peut pas supprimer le channel !");

    const msg = await nuke.clone();
    nuke.delete();
    msg.setPosition(nuke.position);
    const embed = new MessageEmbed()
      .setTitle("Le channel a été nuked ! <a:Check:793823986042667028>")
      .setColor("GREEN")
      .setImage("https://c.tenor.com/pX617LglxSoAAAAC/explode-blast.gif");

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("delete")
        .setEmoji("🗑️")
        .setStyle("DANGER")
    );

    const sucess = await msg.send({ embeds: [embed], components: [row] });

    const filter = (i) =>
      i.customId === "delete" && i.user.id === interaction.user.id;

    const collector = sucess.createMessageComponentCollector({
      filter,
      max: 1,
      time: 30000,
    });

    collector.on("collect", async (i) => {
      if (!i.isButton()) {
        return;
      }
      if (i.customId === "delete") {
        await sucess.delete();
      }
    });

    collector.on("end", (collected) => {});

    setTimeout(() => cooldowns.delete(interaction.guild.id), 180000);
    cooldowns.set(interaction.guild.id, Date.now() + 180000);
  },
};
