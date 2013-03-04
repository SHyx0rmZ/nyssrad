data = require './data'

module.exports =
    exit: (storename) ->
        data.flush storename
        process.exit()
