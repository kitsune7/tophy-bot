import Discord from 'discord.js'
import processCommand from './commands/index.js'
import { runMessageActions } from './actions/index.js'

function isTophyCommand(message) {
  const tophyCommandRegex = /^t (.*)/
  return tophyCommandRegex.test(message.content)
}

;(function main() {
  const client = new Discord.Client()

  client.on('ready', () => {
    console.log('I am ready!')
  })

  client.on('message', (message) => {
    if (message.author.username === 'Tophy Bot') {
      return
    }

    if (isTophyCommand(message)) {
      processCommand(message)
    } else {
      runMessageActions(message)
    }
  })

  // Log our bot in using the token from https://discordapp.com/developers/applications/me
  return client.login(process.env.BOT_TOKEN)
})()
