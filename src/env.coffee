data = require './data'
config = require './config'
VERSION = '0.1.1'

process.on 'uncaughtException', (error) ->
    console.error error.stack

exit = (storename) ->
    unless storename?
        storename = config.store.stores.loaded

    data.flush storename
    process.exit()

exports.VERSION = VERSION
exports.exit = exit
