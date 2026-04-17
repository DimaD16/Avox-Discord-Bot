const { MessageEmbed, Collection } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const guild = require(`../../models/guild.js`);

module.exports = {
  category: "Bot",
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Savoir le temps de réaction du bot."),

  async execute(client, interaction) {
    const debut = Date.now();
    const request = await client.db.guild.findOne({
      where: { guild_id: "715523895620403211" },
    });

    const bdd = Date.now() - debut;

    const di = await interaction.reply("Attend");

    const embed = new MessageEmbed()
      .setTitle(`<:Ping:790680568173559818> Pong ! <:Ping:790680568173559818>`)
      .setColor("#3b9aff")
      .addField(
        `Ping du message :`,
        `\`${di.createdTimestamp - message.createdTimestamp}ms\``
      )
      .addField(`Ping de l'api :`, `\`${client.ws.ping}ms\``)
      .addField(`Ping de la base de donnée :`, `\`${bdd}ms\``)
      .setTimestamp();

    di.edit(" ", { embeds: [embed] });
  },
};
