import { CommandInteraction } from 'discord.js';
import { rollResponse } from '../commands';

export const commandRouter = (
  interaction: CommandInteraction
): Promise<void> | void => {
  switch (interaction.commandName) {
    case 'roll':
      return rollResponse(interaction);
    default:
      return interaction.reply({
        content: 'Unknown command!',
        ephemeral: true,
      });
  }
};
