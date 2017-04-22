const pizzapi = require('dominos')

module.exports = {
  init: (controller) => {
    controller.hears([/i want a pizza/, /i want pizza/], ['direct_message', 'direct_mention', 'ambient'], (bot, message) => {
      bot.reply(message, 'Sup! Looking for nearby stores...')
      pizzapi.Util.findNearbyStores('11 Times Square, New York, NY 10036', 'Delivery', (storeData) => {
        let storeList = storeData.result.Stores
        let filteredStoreList = storeList.filter((store) => {
          return store.IsOpen && store.IsOnlineCapable && store.IsOnlineNow
        })
        let shortList = filteredStoreList.reduce((newString, store) => {
          newString += `ID: ${store.StoreID}\r\nAddress: ${store.AddressDescription}\r\n\r\n`
          return newString
        }, '')
        bot.reply(message, shortList)
      })
    })
  },
  help: {
    command: 'i want pizza',
    text: 'You want pizza? Say: I want pizza. Boom.'
  }
}
