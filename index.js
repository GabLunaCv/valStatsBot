const fs = require("fs");
const path = require("path");
const { Client } = require("discord.js");
const { ApplyCommands } = require("./deploy-commands");
require("dotenv").config();

const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: ["GUILDS"] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => {
  file.endsWith(".js");
});

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  client.commands.set(command.data.name, command);
}

ApplyCommands();

client.once("ready", () => {
  console.log("Ready!");
});

client.on('interactionCreate', async interaction => {
  if(!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if(!command) return;

  try {
    await command.execute(interaction)
  } catch (error) {
    console.log(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
})

client.login(token);
