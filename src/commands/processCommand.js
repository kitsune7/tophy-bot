const getArgs = (message) => {
  return message.content.match(/("[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|\/[^\/\\]*(?:\\[\S\s][^\/\\]*)*\/[gimy]*(?=\s|$)|(?:\\\s|\S)+)/g)
}

function processCommand(message) {
  const args = getArgs(message)
  console.log(args)
}

module.exports = processCommand