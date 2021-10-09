import { CommandInteraction } from 'discord.js';
import { rollResponse } from '../commands';

export const commandRouter = (
  interaction: CommandInteraction
): Promise<void> | void => {
  if (interaction.commandName === 'roll') {
    return rollResponse(interaction);
  }
};
