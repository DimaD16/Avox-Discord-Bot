const { MessageEmbed, MessageAttachment, MessageButton, MessageActionRow } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports = {
	category: "Owner",
	disable: true,
	data: new SlashCommandBuilder()
		.setName("serverlist")
		.setDescription("Liste des serveurs."),

	async execute(client, interaction) {

		let i0 = 0;
		let i1 = 10;
		let page = 1;

		let description =
			`Serveur : ${client.guilds.cache.size}\n\n` +
			client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r)
				.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Membres`)
				.slice(0, 10)
				.join("\n");

		const embed = new MessageEmbed()
			.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
			.setFooter(client.user.username)
			.setTitle(`Page : ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)
			.setDescription(description);

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('right')
					.setEmoji('⬅')
					.setStyle('PRIMARY'),

				new MessageButton()
					.setCustomId('left')
					.setEmoji('➡')
					.setStyle('PRIMARY'),

				new MessageButton()
					.setCustomId('delete')
					.setEmoji('🗑')
					.setStyle('DANGER'),
			);

		const msg = await interaction.reply({ embeds: [embed], components: [row] });

		const filter = i => i.user.id === interaction.user.id;

		const collector = interaction.channel.createMessageComponentCollector({ filter: filter, time: 30000 });

		collector.on("collect", async (i) => {

			if (!i.isButton()) { return }
			if (i.customId === 'right') {

				// Updates variables
				i0 = i0 - 10;
				i1 = i1 - 10;
				page = page - 1;
                
				// if there is no guild to display, delete the message
	
                
				description = `Serveur : ${client.guilds.cache.size}\n\n` +
					client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r)
						.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Membres`)
						.slice(i0, i1)
						.join("\n");

				// Update the embed with new informations
				embed.setTitle(`Page: ${page}/${Math.round(client.guilds.cache.size / 10)}`)
					.setDescription(description);
            
				// Edit the message 
				msg.editReply({ embeds: embed });
            
			}

			if (!i.isButton()) { return }
			if (i.customId === 'left') {


				// Updates variables
				i0 = i0 + 10;
				i1 = i1 + 10;
				page = page + 1;

				// if there is no guild to display, delete the message
				if (i1 > client.guilds.cache.size + 10) {
					return i.deleteReply();
				}
				if (!i0 || !i1) {
					return i.deleteReply();
				}

				description = `Serveur : ${client.guilds.cache.size}\n\n` +
					client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r)
						.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Membres`)
						.slice(i0, i1)
						.join("\n");

				// Update the embed with new informations
				embed.setTitle(`Page: ${page}/${Math.round(client.guilds.cache.size / 10)}`)
					.setDescription(description);
            
				// Edit the message 
				i.editReply({ embeds: embed });

			}


			if (!i.isButton()) { return }
			if (i.customId === 'delete') {
				console.log(interaction)
				i.interaction.deleteReply()
			}

		});
	}
}