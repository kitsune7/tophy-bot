import fs from 'fs'
import path from 'path'
import * as responseFunctions from './responseFunctions.js'

const projectRootDir = path.resolve('')

function checkFullMatch(message, matchString) {
  return message.content.toLowerCase() === matchString
}

function checkFuzzyMatch(message, matchString) {
  return message.content.toLowerCase().includes(matchString)
}

function getMessageActions() {
  const messageActionsString = fs
    .readFileSync(path.join(projectRootDir, 'src/actions/messageActions.json'))
    .toString()
  return JSON.parse(messageActionsString)
}

const messageActions = getMessageActions()

function runMessageActions(message) {
  messageActions.forEach((messageAction) => {
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

export default runMessageActions
