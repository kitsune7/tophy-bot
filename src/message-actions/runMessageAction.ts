import { Message } from 'discord.js';
import fs from 'fs';
import path from 'path';
import * as responseFunctions from './responseFunctions';

type MessageAction = {
  fullMessage: boolean;
  matchString: string;
  responseFunction: string;
  simpleResponse: string;
};

const projectRootDir = path.resolve('');

function checkFullMatch(message: Message, matchString: string) {
  return message.content.toLowerCase() === matchString;
}

function checkFuzzyMatch(message: Message, matchString: string) {
  return message.content.toLowerCase().includes(matchString);
}

function getMessageActions() {
  const messageActionsString = fs
    .readFileSync(path.join(projectRootDir, 'src/actions/messageActions.json'))
    .toString();
  return JSON.parse(messageActionsString);
}

const messageActions = getMessageActions();

function runMessageAction(message: Message) {
  messageActions.forEach((messageAction: MessageAction) => {
    const isMatch = messageAction.fullMessage
      ? checkFullMatch
      : checkFuzzyMatch;

    if (isMatch(message, messageAction.matchString)) {
      if (messageAction.responseFunction) {
        (responseFunctions as any)[messageAction.responseFunction](message);
      } else {
        message.channel.send(messageAction.simpleResponse);
      }
    }
  });
}

export default runMessageAction;
