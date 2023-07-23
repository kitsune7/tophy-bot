import * as dotenv from 'dotenv';
dotenv.config();

import Discord, { Client, GatewayIntentBits } from 'discord.js';
import { DisTube } from 'distube';
import { YtDlpPlugin } from '@distube/yt-dlp';
import fs from 'fs';

(async function main() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildVoiceStates,
    ],
  });
  const distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [new YtDlpPlugin()],
  });

  const token = process.env.TOKEN as string;
  const clientId = process.env.CLIENT_ID as string;

  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();

  fs.readdir('./commands/', (err, files) => {
    if (err) return console.log('Could not find any commands!');
    const jsFiles = files.filter((f) => f.split('.').pop() === 'js');
    if (jsFiles.length <= 0) return console.log('Could not find any commands!');
    jsFiles.forEach((file) => {
      const cmd = require(`./commands/${file}`);
      console.log(`Loaded ${file}`);
      client.commands.set(cmd.name, cmd);
      if (cmd.aliases)
        cmd.aliases.forEach((alias) => client.aliases.set(alias, cmd.name));
    });
  });

  client.once('ready', () => {
    console.log('Ready!');
  });

  client.on('error', console.error);
  client.on('warn', console.warn);

  client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;
    const prefix = '!';
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd =
      client.commands.get(command) ||
      client.commands.get(client.aliases.get(command));
    if (!cmd) return;
    if (cmd.inVoiceChannel && !message.member.voice.channel) {
      return message.channel.send(`You must be in a voice channel!`);
    }
    try {
      cmd.run(client, message, args);
    } catch (e) {
      console.error(e);
      message.channel.send(`Error: \`${e}\``);
    }
  });

  const status = (queue) =>
    `Volume: \`${queue.volume}%\` | Filter: \`${
      queue.filters.names.join(', ') || 'Off'
    }\` | Loop: \`${
      queue.repeatMode
        ? queue.repeatMode === 2
          ? 'All Queue'
          : 'This Song'
        : 'Off'
    }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;
  client.distube
    .on('playSong', (queue, song) =>
      queue.textChannel.send(
        `Playing \`${song.name}\` - \`${
          song.formattedDuration
        }\`\nRequested by: ${song.user}\n${status(queue)}`
      )
    )
    .on('addSong', (queue, song) =>
      queue.textChannel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
      )
    )
    .on('addList', (queue, playlist) =>
      queue.textChannel.send(
        `Added \`${playlist.name}\` playlist (${
          playlist.songs.length
        } songs) to queue\n${status(queue)}`
      )
    )
    .on('error', (channel, e) => {
      if (channel)
        channel.send(`An error encountered: ${e.toString().slice(0, 1974)}`);
      else console.error(e);
    })
    .on('empty', (channel) =>
      channel.send('Voice channel is empty! Leaving the channel...')
    )
    .on('searchNoResult', (message, query) =>
      message.channel.send(`No result found for \`${query}\`!`)
    )
    .on('finish', (queue) => queue.textChannel.send('Finished!'));

  return client.login(process.env.TOKEN);
})();
