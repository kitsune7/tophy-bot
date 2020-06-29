const randomNumber = require('random-number-csprng')

module.exports = {
  rollD20: async message => {
    const result = await randomNumber(1, 20)
    message.channel.send(`You rolled a ${result}`)
  },
  goToSleep: message => {
    message.channel.send('TophyBot supports your sleep. Get some rest. It\'s good for you. :gun:')
  },
  addFoxReaction: message => {
    message.react('🦊')
  },
  addGunReaction: message => {
    message.react('🔫')
  },
  addLoveReaction: message => {
    message.react('️❤️️️')
  },
  addAmericaReaction: message => {
    message.react('🇺🇸')
    message.react('🎆')
  }
}
