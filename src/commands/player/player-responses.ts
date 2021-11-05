import { CommandInteraction } from 'discord.js';
import { DisTube } from 'distube';

export const playResponse = async (
  interaction: CommandInteraction,
  distube: DisTube
) => {
  const song = interaction.options.get('song')?.value;
  // @ts-ignore
  return distube.play(interaction.command, song);
};

export const stopResponse = async (
  interaction: CommandInteraction,
  distube: DisTube
) => {
  return distube.stop(interaction.guildId);
};

export const loopResponse = async (
  interaction: CommandInteraction,
  distube: DisTube
) => {
  console.log(interaction.options.get('mode')?.value);
  distube.setRepeatMode(interaction.guildId, 0);
};
