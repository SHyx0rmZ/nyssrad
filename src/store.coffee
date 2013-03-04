Hash = require 'hashish'
config = require './config'
log = require './log'

Value = ->
    this.value = null
    this.readonly = false
    this.set = (value, readonly) ->
        this.value = value
        if readonly.toString() == "true"
            this.readonly = true
        else
            this.readonly = false

    this.get = ->
        this.value

    this.readOnly = ->
        this.readonly

    return

Store = {}

set = (data) ->
    return false if data.length == 0

    key = data[0]
    value = data[1]

    if data.length > 2
        readonly = data[2]
    else
        readonly = false

    if Hash(Store).has key
        if Store[key].readOnly()
            return_value = false
        else
            Store[key].set value, readonly
            return_value = true
    else
        Store[key] = new Value()
        Store[key].set value, readonly
        return_value = true

get = (key) ->
    values = []

    for k in key
        if k == '/'
            continue

        if Hash(Store).has k
            values.push Store[k].get()
        else
            values.push false

    return values

getStore = ->
    Store

setStore = (store) ->
    for key of store
        Store[key] = new Value()
        Store[key].set store[key].value, store[key].readonly

getJSONfiedStore = ->
    JSON.stringify Store

exports.set = set
exports.get = get
exports.name
exports.getStore = getStore
exports.getJSONfiedStore = getJSONfiedStore
exports.setStore = setStore
