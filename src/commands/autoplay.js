module.exports = {
  name: 'autoplay',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(`There is nothing in the queue right now!`);
    const autoplay = queue.toggleAutoplay();
    message.channel.send(`AutoPlay: \`${autoplay ? 'On' : 'Off'}\``);
  },
};
