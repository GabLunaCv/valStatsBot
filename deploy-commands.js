const fs = require("fs");
const path = require("path");
const { Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");

const clientId = process.env.CLIENT_ID;
const token = process.env.DISCORD_TOKEN;

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandsFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

const rest = new REST({ version: "10" }).setToken(token);

for (const file of commandsFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

async function ApplyCommands() {
  try {
    rest.put(Routes.applicationCommands(clientId), { body: commands });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  ApplyCommands,
};
