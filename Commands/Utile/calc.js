const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { evaluate } = require("mathjs");

module.exports = {
  category: "Utile",
  data: new SlashCommandBuilder()
    .setName("calc")
    .setDescription("Calculer une expression !"),

  async execute(client, interaction) {
    let data = " ";
    let content = "";

    const components = generateComponents();

    const embed = new MessageEmbed()
      .setTitle("Calculatrice")
      .setDescription("``` \n```")
      .setFooter({
        text: "La calculatrice se desactivera apres 20 secondes d'inactivité.",
        iconURL: client.user.avatarURL(),
      });
    interaction.reply({ embeds: [embed], components });
    const message = await interaction.fetchReply();

    const collector = message.createMessageComponentCollector({ time: 20000 });

    collector.on("collect", (compInt) => {
      if ((compInt.member.id === interaction.member.id) === false) {
        return compInt.reply({
          content: "Ce n'est pas votre calculatrice !",
          ephemeral: true,
        });
      }
      const value = compInt.customId;

      switch (value) {
        case "clear":
          data = "";
          content = "``` \n```";
          break;
        case "=":
          try {
            const res = evaluate(data);
            content = `\`\`\`\n${data} \n = ${res}\`\`\``;
            data = res + "";
          } catch (e) {
            content = "```\nERREUR\n```";
            data = "";
          }
          break;
        default:
          data += value;
          content = "```" + data + "\n```";
          break;
      }

      collector.resetTimer();
      embed.setDescription(content);
      compInt.update({ embeds: [embed], components: components });
    });
    collector.on("end", (collected) => {
      message.edit({
        embeds: [
          embed
            .setFooter({
              text: "La session a expirer. Vous pouvez en recrée avec /calculator.",
              iconURL: client.user.avatarURL(),
            })
            .setDescription("```\nDISABLE\n```"),
        ],
        components: [],
      });
    });
  },
};

const generateComponents = () => {
  const row1 = new MessageActionRow().addComponents(
    new MessageButton().setCustomId("clear").setLabel("C").setStyle("DANGER"),
    new MessageButton().setCustomId("(").setLabel("(").setStyle("PRIMARY"),
    new MessageButton().setCustomId(")").setLabel(")").setStyle("PRIMARY"),
    new MessageButton().setCustomId("^").setLabel("^").setStyle("PRIMARY")
  );
  const row2 = new MessageActionRow().addComponents(
    new MessageButton().setCustomId("7").setLabel("7").setStyle("SECONDARY"),
    new MessageButton().setCustomId("8").setLabel("8").setStyle("SECONDARY"),
    new MessageButton().setCustomId("9").setLabel("9").setStyle("SECONDARY"),
    new MessageButton().setCustomId("/").setLabel("/").setStyle("PRIMARY")
  );
  const row3 = new MessageActionRow().addComponents(
    new MessageButton().setCustomId("4").setLabel("4").setStyle("SECONDARY"),
    new MessageButton().setCustomId("5").setLabel("5").setStyle("SECONDARY"),
    new MessageButton().setCustomId("6").setLabel("6").setStyle("SECONDARY"),
    new MessageButton().setCustomId("*").setLabel("*").setStyle("PRIMARY")
  );
  const row4 = new MessageActionRow().addComponents(
    new MessageButton().setCustomId("1").setLabel("1").setStyle("SECONDARY"),
    new MessageButton().setCustomId("2").setLabel("2").setStyle("SECONDARY"),
    new MessageButton().setCustomId("3").setLabel("3").setStyle("SECONDARY"),
    new MessageButton().setCustomId("-").setLabel("-").setStyle("PRIMARY")
  );
  const row5 = new MessageActionRow().addComponents(
    new MessageButton().setCustomId("0").setLabel("0").setStyle("SECONDARY"),
    new MessageButton().setCustomId(".").setLabel(".").setStyle("SECONDARY"),
    new MessageButton().setCustomId("=").setLabel("=").setStyle("SUCCESS"),
    new MessageButton().setCustomId("+").setLabel("+").setStyle("PRIMARY")
  );
  return [row1, row2, row3, row4, row5];
};
