'use strict'
require('dotenv').config()

/* imports */
const fs = require('fs')
const Discord = require('discord.js')
const responseFunctions = require('./responseFunctions.js')

/* functions */
const getMessageActions = () => {
  return JSON.parse(fs.readFileSync('./messageActions.json'))
}

const checkFullMatch = (message, matchString) => {
  return message.content.toLowerCase() === matchString
}

const checkFuzzyMatch = (message, matchString) => {
  return message.content.toLowerCase().includes(matchString)
}

/* setup */
const client = new Discord.Client()
const messageActions = getMessageActions()

/* events */
client.on('ready', () => {
  console.log('I am ready!')
})

client.on('message', message => {
  if (message.author.username === 'Tophy Bot') {
    return
  }

  messageActions.forEach(messageAction => {
    const isMatch = messageAction.fullMessage ? checkFullMatch : checkFuzzyMatch

    if (isMatch(message, messageAction.matchString)) {
      if (messageAction.responseFunction) {
        responseFunctions[messageAction.responseFunction](message)
      } else {
        message.channel.send(messageAction.simpleResponse)
      }
    }
  })
})

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.BOT_TOKEN)
