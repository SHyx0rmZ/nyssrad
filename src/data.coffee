fs = require "fs"
config = require "./config"
store = require "./store"
log = require "./log"

name = (storename = []) ->
    if storename.length > 0
        storename[0].toString()
    else if thisStore?
        thisStore
    else if config.store.use_default
        config.store.stores.default
    else
        false

module.exports =
    flush: (storename) ->
        filename = name storename

        return false unless filename

        content = store.getJSONfiedStore()

        try
            fs.writeFileSync filename, content, 'utf8'
            log.message 'Wrote file ' + filename
            true
        catch e
            log.failure e
            log.debug e.stack
            false

    load: ->
        filename = name()

        unless filename
            log.debug 'Nothing to load'
            return

        try
            content = fs.readFileSync filename, 'utf8'
            store.setStore JSON.parse content
            config.store.stores.loaded = filename
            log.success 'Successfully loaded ' + filename
        catch e
            log.failure e

    registerFlushing: ->
        setInterval flush, config.store.flush.milliseconds

    setFilename: (filename) ->
        thisStore = filename
