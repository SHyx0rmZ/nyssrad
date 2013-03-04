store = require './store'
response = require './response'
env = require './env'
handle = {}

get = (param) ->
    if param.substr(param.length - 1, param.length) == '/'
        param = param.slice 0, -1

    params = param.split '/'

    unless store.get params
        response.build "false"
    else
        response.build store.get params

set = (param) ->
    keyValue = param.split '/'

    response.build store.set keyValue

getStore = ->
    response.build store.getStore()

exportStore = ->
    response.build store.getJSONfiedStore()

root = ->
    response.build "nyssrad " + env.VERSION + " beta - powered by node.js"

handle["/"] = root
handle["/get"] = get
handle["/set"] = set
handle["/getstore"] = getStore
handle["/export"] = exportStore

module.exports =
    getHandles: ->
        handle
