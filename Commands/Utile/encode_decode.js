const { MessageEmbed, MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const base64 = require("base-64");
const binary = require("decode-encode-binary");

module.exports = {
  category: "Utile",
  data: new SlashCommandBuilder()
    .setName("encode_decode")
    .setDescription("Encode/Decode.")
    .addStringOption((option) =>
      option
        .setName("language")
        .setDescription("Choisir le language a encode/decode.")
        .addChoice("Base64", "base")
        .addChoice("Binary", "bin")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("action")
        .setDescription("Encode ou Decode ?")
        .addChoice("encode", "encode")
        .addChoice("decode", "decode")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Le texte à encoder/décoder.")
        .setRequired(true)
    ),

  async execute(client, interaction) {
    const language = interaction.options.getString("language");
    const action = interaction.options.getString("action");
    const text = interaction.options.getString("text");

    if (language === "base") {
      var encode;

      if (action === "encode") {
        encode = base64.encode(text);
      } else if (action === "decode") {
        encode = base64.decode(text);
      }

      try {
        interaction.reply(encode);
      } catch (e) {
        interaction.reply("Je ne peut pas encoder/decoder ceci !", {
          ephemeral: true,
        });
      }
    } else if (language === "bin") {
      var encode;

      if (action === "encode") {
        encode = await binary.encode(text);
      } else if (action === "decode") {
        encode = await binary.decode(text);
      }

      try {
        interaction.reply(encode);
      } catch (e) {
        interaction.reply("Je ne peut pas encoder/decoder ceci !", {
          ephemeral: true,
        });
      }
    }
  },
};
