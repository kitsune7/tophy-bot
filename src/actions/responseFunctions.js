import randomNumber from 'random-number-csprng'
import fetch from 'node-fetch'
import cursedCounterEmbed from '../embeds/cursedCounterEmbed.js'

const yeetGifs = [
  'https://giphy.com/gifs/jump-random-yeet-KzoZUrq40MaazLgHsg',
  'https://giphy.com/gifs/memecandy-J1ABRhlfvQNwIOiAas',
  'https://giphy.com/gifs/reaction-yes-rainbow-8Z30gVRYNEeEUQf8z7',
  'https://giphy.com/gifs/cartoonhangover-upvote-yeet-costume-quest-5PhDdJQd2yG1MvHzJ6',
  'https://giphy.com/gifs/doctorwho-doctor-who-series-11-the-tsuranga-conundrum-jyPgrG8iqMu6Da7RWb',
  'https://giphy.com/gifs/vh1-black-ink-crew-4EEIsDmNJCiNcvAERe',
  'https://giphy.com/gifs/QVP7DawXZitKYg3AX5',
  'https://giphy.com/gifs/trash-najmtazy4OiiI',
  'https://giphy.com/gifs/cartoonhangover-christmas-yeet-costume-quest-kZKYIITGxpEoqdbJ4x',
  'https://giphy.com/gifs/violentprofessional-yeet-viopro-vioyeet-homRRTASog0PLbe5BV',
  'https://giphy.com/gifs/maddengiferator-yeet-YPcilB55v35ZK',
  'https://giphy.com/gifs/yeet-11HkufsiNrBXK8',
  'https://giphy.com/gifs/netflix-3oriOc6rvVsVk5N31K',
  'https://giphy.com/gifs/SkyTV-bye-see-ya-throwing-you-out-2uxVmiuizw7UAOnP6L',
  'https://giphy.com/gifs/unitedwrestling-primetime-united-wrestling-primetimelive-q7WHKVpqpnuJKwFQj0',
  'https://giphy.com/gifs/Ludo-Studio-chores-the-strange-jReOsiHgCVTNaqD68F',
  'https://giphy.com/gifs/fresh-prince-jazzy-jeff-dj-wQCWMHY9EHLfq',
  'https://giphy.com/gifs/taiwanese-animation-nmatv-harlem-shake-ZJzuJJJJCqNPO',
  'https://giphy.com/gifs/warnerarchive-warner-archive-blaxploitation-melinda-l3V0j3ytFyGHqiV7W',
  'https://giphy.com/gifs/humor-chuck-norris-walker-texas-ranger-ylp4hl9xEaWyc',
  'https://giphy.com/gifs/BrookfieldZoo-jump-flying-mongoose-igsBLlZjwItVL9qiJI',
  'https://gfycat.com/snarlingniftydowitcher-dougdoug-cooking-parody-zelda-botw',
  'https://thumbs.gfycat.com/ScalyPopularCuscus-max-1mb.gif',
  'https://gfycat.com/gracioushonorableamericanredsquirrel',
  'https://gfycat.com/illfatedrichargentineruddyduck',
]

const cursedGifs = [
  'https://giphy.com/gifs/cat-weird-teeth-vbD9OoDgUOpkk',
  'https://giphy.com/gifs/weird-funny-fOzPHQKeNRPRS',
  'https://giphy.com/gifs/3d-weird-dNSZTqk3goY92',
  'https://giphy.com/gifs/1hM7Ldvcpps01Cwles',
  'https://giphy.com/gifs/wtf-creepygif-LllA2dKt1qZuE',
  'https://giphy.com/gifs/jwLAdEz6rw1u8',
]

const randomGif = (message, tag) => {
  const requestUrl = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=${tag}&rating=g`
  fetch(requestUrl)
    .then((response) => response.json())
    .then((response) => message.channel.send(response.data.url))
}

const randomControlledGif = (message, list) => {
  randomNumber(0, list.length - 1).then((gifIndex) => {
    message.channel.send(list[gifIndex])
  })
}

export const rollD20 = async (message) => {
  const result = await randomNumber(1, 20)
  message.channel.send(`You rolled a ${result}`)
}

export const goToSleep = (message) => {
  message.channel.send("TophyBot supports your sleep. Get some rest. It's good for you. :gun:")
}

export const addFoxReaction = (message) => {
  message.react('🦊')
}

export const addGunReaction = (message) => {
  message.react('🔫')
}

export const addLoveReaction = (message) => {
  message.react('️❤️️️')
}

export const addAmericaReaction = (message) => {
  message.react('🇺🇸')
  message.react('🎆')
}

export const yeet = async (message) => {
  const gifIndex = await randomNumber(0, yeetGifs.length - 1)
  message.channel.send(yeetGifs[gifIndex])
}

export const showCurse = async (message) => {
  randomControlledGif(message, cursedGifs)
}

export const showCat = (message) => {
  randomGif(message, 'cat')
}

export const increaseCursedCounter = (message) => {
  const currentCursedCounter = JSON.parse(localStorage.getItem('cursedCounter') ?? '0')
  localStorage.setItem('cursedCounter', currentCursedCounter + 1)
  message.channel.send(cursedCounterEmbed)
}
