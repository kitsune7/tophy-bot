import { SlashCommandBuilder } from '@discordjs/builders';

export const play = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Plays a song from youtube')
  .addStringOption((option) => {
    const description =
      'The song you want to play. This can be a url, search string, or a playlist';
    return option.setName('song').setDescription(description).setRequired(true);
  });

export const volume = new SlashCommandBuilder()
  .setName('volume')
  .setDescription('Sets music volume')
  .addIntegerOption((option) => {
    const description = 'The volume amount to set (0-100)';
    return option
      .setName('amount')
      .setDescription(description)
      .setRequired(false);
  });

export const loop = new SlashCommandBuilder()
  .setName('loop')
  .setDescription('Sets loop mode')
  .addIntegerOption((option) => {
    const description = 'Loop mode';
    return option
      .setName('mode')
      .setDescription(description)
      .setRequired(true)
      .addChoice('off', 0)
      .addChoice('on', 1);
  });

export const skip = new SlashCommandBuilder()
  .setName('skip')
  .setDescription('Skip to the next song');

export const queue = new SlashCommandBuilder()
  .setName('queue')
  .setDescription('See the queue');

export const pause = new SlashCommandBuilder()
  .setName('pause')
  .setDescription('Pause the current song');

export const resume = new SlashCommandBuilder()
  .setName('resume')
  .setDescription('Resume the current song');

export const stop = new SlashCommandBuilder()
  .setName('stop')
  .setDescription('Stop the player');
