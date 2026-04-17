const {
  MessageEmbed,
  Collection,
  MessageButton,
  MessageC,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");

module.exports = {
  category: "Image",
  data: new SlashCommandBuilder()
    .setName("animal")
    .setDescription("Afficher une image d'un animal au choix !")
    .addStringOption((option) =>
      option
        .setName("animal_name")
        .setDescription("Un animal pour afficher une image.")
        .setRequired(true)
        .addChoice("Chat", "cat")
        .addChoice("Chien", "dog")
        .addChoice("Panda", "panda")
        .addChoice("Renard", "fox")
        .addChoice("Panda roux", "red_panda")
        .addChoice("Koala", "koala")
        .addChoice("Oiseau", "bird")
        .addChoice("Raton Laveur", "racoon")
        .addChoice("Kangourou", "kangaroo")
    ),

  async execute(client, interaction) {
    const animal_name = interaction.options.getString("animal_name");

    const animal_url = `https://some-random-api.ml/animal/${animal_name}`;

    const t = {
      cat: "Meow !!",
      dog: "Woof !!",
      panda: "Bou-Bou-Bou !!",
      fox: "Woof-Woof !!",
      red_panda: "Raaa-Rraaaa !!",
      koala: "Woo-Woo-Woo !!",
      bird: "Chirrr !!",
      racoon: "Chirrr !!",
      kangaroo: "Bou-Bou-Bou !!",
    };

    const animal_text = t[animal_name];

    const res = await fetch(encodeURI(animal_url));
    const json = await res.json();

    const embed = new MessageEmbed()
      .setAuthor({ name: `${animal_text}` })
      .setDescription(
        `**_[L'image ne se charge pas ? Cliquez-ici !](${json.image})_**`
      )
      .setImage(json.image, `${animal_name}.png`);

    interaction.reply({ embeds: [embed] });
  },
};
