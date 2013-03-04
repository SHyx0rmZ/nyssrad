cmd = require 'commander'
log = require './log'
store = require './store'
utils = require './utils'
data = require './data'
aspects = require './aspects'

commands =
    set: store.set
    get: store.get
    "export": store.getJSONfiedStore
    exit: utils.exit
    quit: utils.exit
    flush: data.flush

prompt = ->
    cmd.prompt '> ', (promptdata) ->
        parse promptdata
        prompt()

parse = (data) ->
    tokens = data.split ' '

    if typeof commands[tokens[0]] == 'function'
        result = commands[tokens.shift()](tokens)

        if result
            log.data result
        else
            log.failure "false"
    else
        log.message "unknown command " + tokens[0]

exports.prompt = prompt
