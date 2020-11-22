const fs = require('fs')
const path = require('path')
const responseFunctions = require('./responseFunctions.js')

function checkFullMatch(message, matchString) {
  return message.content.toLowerCase() === matchString
}

function checkFuzzyMatch(message, matchString) {
  return message.content.toLowerCase().includes(matchString)
}

function getMessageActions() {
  const messageActionsString = fs.readFileSync(path.join(__dirname, './messageActions.json')).toString()
  return JSON.parse(messageActionsString)
}

const messageActions = getMessageActions()

function runMessageActions(message) {
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
}

module.exports = runMessageActions