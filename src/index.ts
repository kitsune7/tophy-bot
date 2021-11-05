import * as dotenv from 'dotenv';
dotenv.config();

import { Client, Intents } from 'discord.js';
import { DisTube } from 'distube';

import { runMessageAction } from './message-actions';
import { commandRouter } from './interactions';

(async function main() {
  const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_VOICE_STATES,
    ],
  });
  const distube = new DisTube(client);

  client.once('ready', () => {
    console.log('Ready!');
  });

  client.on('error', console.error);
  client.on('warn', console.warn);

  distube.on('error', (channel, error) => {
    console.error(error);
    channel.send(`An error encoutered: ${error.toString().slice(0, 1979)}`); // Discord limits 2000 characters in a message
  });

  // player.on('error', (queue, error) => {
  //   console.log(queue, error);
  //   console.log(
  //     `[${queue.guild.name}] Error emitted from the queue: ${error.message}`
  //   );
  // });
  // player.on('connectionError', (queue, error) => {
  //   console.log(
  //     `[${queue.guild.name}] Error emitted from the connection: ${error.message}`
  //   );
  // });
  //
  // player.on('trackStart', (queue: Queue<any>, track) => {
  //   queue.metadata.send(
  //     `🎶 | Started playing: **${track.title}** in **${queue.connection.channel.name}**!`
  //   );
  // });
  //
  // player.on('trackAdd', (queue: Queue<any>, track) => {
  //   queue.metadata.send(`🎶 | Track **${track.title}** queued!`);
  // });
  //
  // player.on('botDisconnect', (queue: Queue<any>) => {
  //   queue.metadata.send(
  //     '❌ | I was manually disconnected from the voice channel, clearing queue!'
  //   );
  // });
  //
  // player.on('channelEmpty', (queue: Queue<any>) => {
  //   queue.metadata.send('❌ | Nobody is in the voice channel, leaving...');
  // });
  //
  // player.on('queueEnd', (queue: Queue<any>) => {
  //   queue.metadata.send('✅ | Queue finished!');
  // });

  client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;

    if (
      message.content === '!deploy' &&
      message.author.id === process.env.TOPHY_USER_ID
    ) {
      await message.guild.commands.set([]);

      await message.reply('Deployed!');
    }

    if (message.content.startsWith('!play')) {
      await distube.play(message, message.content.slice(1));
    }
    if (message.content === '!stop') {
      await distube.stop(message);
    }

    runMessageAction(message);
  });

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    await commandRouter(interaction);
  });

  // Log our bot in using the token from https://discordapp.com/developers/applications/me
  return client.login(process.env.TOKEN);
})();
