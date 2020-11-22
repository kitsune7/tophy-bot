import Discord from 'discord.js'

const cursedCounterEmbed = new Discord.MessageEmbed()
  .setColor('DARK_RED')
  .setTitle('Preshie Cursed Counter')
  .setDescription(
    'To keep track of the number of times Preshie has said or posted something horribly cursed'
  )
  .setThumbnail('https://i.imgur.com/6IzAI8v.jpg')
  .addFields({
    name: 'Current Count',
    value: localStorage.getItem('cursedCounter'),
  })
  .setTimestamp()
  .setFooter('TophyBot is watching you Preshie')

export default cursedCounterEmbed
