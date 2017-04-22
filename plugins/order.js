module.exports = {
  init: (controller) => {
    controller.hears([/i want a pizza/, /i want pizza/], ['direct_message', 'direct_mention', 'ambient'], (bot, message) => {
      bot.reply(message, "Sup! Looking for nearby stores...")
    })
  },
  help: {
    command: 'i want pizza',
    text: 'You want pizza? Say: I want pizza. Boom.'
  }
}
