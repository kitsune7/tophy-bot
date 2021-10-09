import { CommandInteraction } from 'discord.js';
import randomNumber from 'random-number-csprng';

export const rollResponse = async (interaction: CommandInteraction) => {
  const result = await randomNumber(1, 20);
  return interaction.reply(`You rolled a ${result}`);
};
