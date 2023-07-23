import * as dotenv from 'dotenv';
dotenv.config();

import { Client, GatewayIntentBits } from 'discord.js';
import { DisTube } from 'distube';
import { YtDlpPlugin } from '@distube/yt-dlp';

import { runMessageAction } from './message-actions';
// import { commandRouter } from './interactions';
// import { roll } from './commands';

(async function main() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildVoiceStates,
    ],
  });
  const distube = new DisTube(client, {
    leaveOnFinish: true,
    leaveOnEmpty: true,
    leaveOnStop: true,
    plugins: [new YtDlpPlugin()],
    searchSongs: 1,
  });

  const token = process.env.TOKEN as string;
  const clientId = process.env.CLIENT_ID as string;
  // const jsonCommands = [roll].map((command) => command.toJSON());
  // const rest = new REST({ version: '9' }).setToken(token);

  client.once('ready', () => {
    console.log('Ready!');
  });

  client.on('error', console.error);
  client.on('warn', console.warn);

  distube
    .on('searchResult', (message, result) => {
      let i = 0;
      message.channel.send(
        `**Choose an option from below**\n${result
          .map(
            (song) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``
          )
          .join('\n')}\n*Enter anything else or wait 30 seconds to cancel*`
      );
    })
    .on('error', (textChannel, error) => {
      console.error(error);
      textChannel.send(
        `An error encountered: ${error.toString().slice(0, 2000)}`
      );
    });

  client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;

    const commandPrefix = '!';
    if (message.content.startsWith(commandPrefix)) {
      const args = message.content
        .slice(commandPrefix.length)
        .trim()
        .split(/ +/g);
      const command = args.shift();
      switch (command) {
        // case 'deploy':
        //   if (message.author.id === process.env.TOPHY_USER_ID) {
        //     await rest
        //       .put(Routes.applicationCommands(clientId), { body: {} })
        //       .then(() =>
        //         console.log('Successfully registered application commands.')
        //       )
        //       .catch(console.error);
        //     await message.reply('Deployed!');
        //   }
        //   break;

        case 'play':
          await distube.play(message.member.voice.channel, args.join(' '), {
			message,
			textChannel: message.channel,
			member: message.member
          }).catch(error => message.reply(error.message));
          break;

        case 'stop':
          await distube.stop(message);
          message.channel.send('Stopped the queue!');
          break;

        case 'loop':
          const mode = distube.setRepeatMode(message);
          const modeToDescription = {
            0: 'off',
            1: 'song',
            2: 'queue',
          };
          message.channel.send(
            `Set repeat mode to ${
              modeToDescription?.[mode as 0 | 1 | 2] ??
              "sad fox. You're not valid."
            }`
          );
          break;

        case 'resume':
          distube.resume(message);
          break;

        case 'pause':
          distube.pause(message);
          break;

        case 'skip':
          await distube.skip(message);
          break;

        case 'seek':
          const secondsPerMinute = 60;
          const getTotalSecondsFromVideoTime = () => {
            const seekTime = args?.[0];
            const videoTimeRegex = /^([0-9]+:[0-9]{1,2}|[0-9]{1,2}):[0-9]{2}$/;

            if (!videoTimeRegex.test(seekTime)) {
              return 0;
            }

            const times = seekTime.split(':').map((num) => Number(num));
            const timeMultiplier = times.length - 1;
            return times.reduce(
              (totalSeconds, time, i) =>
                totalSeconds + time * secondsPerMinute ** (timeMultiplier - i),
              0
            );
          };
          await distube.seek(message, getTotalSecondsFromVideoTime());
          break;

        case 'queue':
          const queue = distube.getQueue(message);
          if (!queue) {
            message.channel.send('Nothing playing right now!');
          } else {
            message.channel.send(
              `Current queue:\n${queue.songs
                .map(
                  (song, id) =>
                    `**${id ? id : 'Playing'}**. ${song.name} - \`${
                      song.formattedDuration
                    }\``
                )
                .slice(0, 10)
                .join('\n')}`
            );
          }
          break;
      }
    }

    runMessageAction(message);
  });

  /*client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    await commandRouter(interaction);
  });*/

  // Log our bot in using the token from https://discordapp.com/developers/applications/me
  return client.login(process.env.TOKEN);
})();
