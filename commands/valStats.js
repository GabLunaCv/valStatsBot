const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("valStats")
    .setDescription("Count and show all characters in valorant!"),
  async execute(interaction) {
    let res = "";
    const charDataVal = await axios.get(
      "https://valorant-api.com/v1/agents?isPlayableCharacter=true"
    );

    for (const char of charDataVal) {
      if (char === charDataVal[0]) {
        res += `${char.displayName}`;
      } else if (char === charDataVal[charDataVal.length - 1]) {
        res += `, ${char.displayName}.`;
      } else {
        res += `, ${char.displayName}`;
      }
    }
    console.log(res);
    await interaction.reply(res);
  },
};
