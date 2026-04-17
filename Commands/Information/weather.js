const { MessageEmbed, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const translate = require("@vitalets/google-translate-api");
const weather = require("weather-js");

module.exports = {
  category: "Information",
  data: new SlashCommandBuilder()
    .setName("weather")
    .setDescription("Météo actuellement !")
    .addStringOption((option) =>
      option
        .setName("lieu")
        .setDescription("Le lieu où vous voulez connaitre la météo.")
        .setRequired(true)
    ),
  async execute(client, interaction) {
    const city = interaction.options.getString("lieu");
    weather.find({ search: city, degreeType: "C" }, function (error, result) {
      if (error) return message.channel.send(error);

      if (result === undefined || result.length === 0)
        return message.channel.send("Je ne trouve pas le lieu !");

      var current = result[0].current;
      var location = result[0].location;

      translate(current.skytext, { to: "fr" }).then((res) => {
        const weatherinfo = new MessageEmbed()
          .setDescription(`En ce moment : \`${res.text}\``)
          .setAuthor({ name: `${current.observationpoint}` })
          .setColor("#3b9aff")
          .setThumbnail(current.imageUrl)
          .addField(
            "Temperature :",
            `${current.temperature ? `${current.temperature}°C` : "inconnu"}`
          )
          .addField(
            "Ressentie :",
            `${current.feelslike ? `${current.feelslike}°C` : "inconnu"}`
          )
          .addField("Vent :", `${current.wind ? current.wind : "inconnu"}`)
          .addField(
            "Humidité :",
            `${current.humidity ? `${current.humidity}%` : "inconnu"}`
          );

        interaction.reply({ embeds: [weatherinfo] });
      });
    });
  },
};
