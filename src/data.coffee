fs = require "fs"
config = require "./config"
store = require "./store"
log = require "./log"

flush = (storename) ->
    filename = ""

    if  storename.length > 0
        filename = storename[0].toString()
    else if thisStore?
        filename = thisStore
    else if config.store.use_default
        filename = config.store.stores.default
    else
        return false

    content = store.getJSONfiedStore()

    try
        fs.writeFileSync filename, content, 'utf8'
        log.message 'Wrote file ' + filename
        true
    catch e
        log.failure e
        log.debug e.stack
        false

load = ->
    filename = ""

    if thisStore?
        filename = thisStore
    else if config.store.use_default
        filename = config.store.stores.default
    else
        log.debug 'Nothing to load'
        return

    try
        content = fs.readFileSync filename, 'utf8'
        store.setStore JSON.parse content
        config.store.stores.loaded = filename
        log.success 'Successfully loaded ' + filename
    catch e
        log.failure e

registerFlushing = ->
    setInterval flush, config.store.flush.milliseconds

setFilename = (filename) ->
    thisStore = filename

exports.flush = flush
exports.load = load
exports.registerFlushing = registerFlushing
exports.setFilename = setFilename
