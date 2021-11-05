import { CommandInteraction } from 'discord.js';
import { DisTube } from 'distube';
import {
  loopResponse,
  playResponse,
  rollResponse,
  stopResponse,
} from '../commands';

export const commandRouter = (
  interaction: CommandInteraction,
  distube: DisTube
): Promise<void> | void => {
  switch (interaction.commandName) {
    case 'roll':
      return rollResponse(interaction);
    case 'play':
      return playResponse(interaction, distube);
    case 'stop':
      return stopResponse(interaction, distube);
    case 'loop':
      return loopResponse(interaction, distube);
    default:
      return interaction.reply({
        content: 'Unknown command!',
        ephemeral: true,
      });
  }
};
