import { CommandInteraction } from 'discord.js';
import randomNumber from 'random-number-csprng';

export const rollResponse = async (interaction: CommandInteraction) => {
  const dtype = interaction.options.get('dtype')?.value;
  const isValidDType = typeof dtype === 'string' && /d[1-9]+[0-9]*/.test(dtype);
  const defaultMax = 20;
  const randomMax = isValidDType ? Number(dtype.replace('d', '')) : defaultMax;
  const result = await randomNumber(1, randomMax);
  return interaction.reply(`(d${randomMax}) You rolled a ${result}`);
};
