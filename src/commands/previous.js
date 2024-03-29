module.exports = {
  name: 'previous',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(`There is nothing in the queue right now!`);
    const song = queue.previous();
    message.channel.send(`Now playing:\n${song.name}`);
  },
};
