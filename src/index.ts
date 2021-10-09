import * as dotenv from 'dotenv';
dotenv.config();

import { Client, Intents } from 'discord.js';
import { runMessageAction } from './message-actions';
import { commandRouter } from './interactions';

(function main() {
  const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
  });

  client.once('ready', () => {
    console.log('Ready!');
  });

  client.on('messageCreate', (message) => {
    if (message.author.username === 'Tophy Bot') {
      return;
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
