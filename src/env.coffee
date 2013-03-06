data = require './data'
config = require './config'

process.on 'uncaughtException', (error) ->
    console.error error.stack

module.exports =
    VERSION: '0.1.1'

    exit: (storename) ->
        unless storename?
            storename = config.store.stores.loaded

        data.flush storename
        process.exit()
