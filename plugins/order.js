const pizzapi = require('dominos')

module.exports = {
  init: (controller) => {
    controller.hears([/i want a pizza/, /i want pizza/], ['direct_message', 'direct_mention', 'ambient'], (bot, message) => {
      bot.createConversation(message, doConvo)
    })
    function doConvo (err, convo) {
      convo.addQuestion('What address to you want it delivered to?', (responseObj) => { convo.setVar('address', responseObj.text) }, {}, 'thread_1')
      convo.activate()
      convo.gotoThread('thread_1')
      convo.setVar('lookup', pizzapi.Util.findNearbyStores(convo.vars.address, 'Delivery', (storeData) => {
        let storeList = storeData.result.Stores
        let filteredStoreList = storeList.filter((store) => {
          return store.IsOpen && store.IsOnlineCapable && store.IsOnlineNow
        })
        let shortList = filteredStoreList.reduce((newString, store) => {
          newString += `ID: ${store.StoreID}\r\nAddress: ${store.AddressDescription}\r\n\r\n`
          return newString
        }, '')
        console.log(shortList)
      }))
      convo.addMessage('Okay. Let me look that up for you.', 'thread_2', convo.vars.lookup.call)

      // convo.addMessage(`I gotchu. Try: ${shortList}`, 'thread_3')
    }
  },
  help: {
    command: 'i want pizza',
    text: 'You want pizza? Say: I want pizza. Boom.'
  }
}
