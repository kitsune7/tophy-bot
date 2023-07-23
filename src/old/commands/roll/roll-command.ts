import { SlashCommandBuilder } from '@discordjs/builders';

export const roll = new SlashCommandBuilder()
  .setName('roll')
  .setDescription('Roll a dice (d2-d100)!')
  .addStringOption((option) => {
    const description =
      'The type of dice to roll (d4, d8, d20, etc.) plus any optional modifiers';
    return option
      .setName('dtype')
      .setDescription(description)
      .setRequired(false);
  });
