const fs = require("fs");
const { Client, Collection, Intents, ShardingManager } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { token_test, token, client_id, client_id_test, test_guild_id } = require("./config.json");

const client = new Client({ intents: new Intents(32767) });

client.commands = new Collection();

let app;

switch(process.platform) {
  case "linux": app = token
    break
  case "win32": app = token_test
}

client.login(app);

const eventFiles = fs
	.readdirSync("./Events")
	.filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./Events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(
			event.name,
			async (...args) => await event.execute(...args, client)
		);
	}
}

client.slashCommands = new Collection();

const slashCommands = fs.readdirSync("./Commands");

for (const module of slashCommands) {
	const commandFiles = fs
		.readdirSync(`./Commands/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./Commands/${module}/${commandFile}`);
		client.slashCommands.set(command.data.name, command);
	}
}

const rest = new REST({ version: "9" }).setToken(app);

const commandJsonData = [
	...Array.from(client.slashCommands.values()).map((c) => c.data.toJSON()),
];

(async () => {
	try {
		console.log("Started refreshing application (/) commands.");
		
		if (app = token_test) {
			await rest.put(
				Routes.applicationGuildCommands(client_id_test, test_guild_id),
				{ body: commandJsonData });

		} else {
			await rest.put(
				Routes.applicationCommands(client_id),
				{ body: commandJsonData })
		}

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(error);
	}
})();
