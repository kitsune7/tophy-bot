import * as dotenv from 'dotenv';
dotenv.config();

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { rollCommand } from './commands';

const token = process.env.TOKEN as string;
const clientId = process.env.CLIENT_ID as string;

const commands = [rollCommand].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest
  .put(Routes.applicationCommands(clientId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);