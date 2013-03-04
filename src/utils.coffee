data = require './data'

exit = (storename) ->
    data.flush storename
    process.exit()

exports.exit = exit
