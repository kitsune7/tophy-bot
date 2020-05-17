'use strict'
require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log('I am ready!')
})

client.on('message', message => {
  if (message.content === 'ping') {
    message.channel.send('pong')
  }
})

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.BOT_TOKEN)
