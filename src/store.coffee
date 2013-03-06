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

module.exports =
    set: (data) ->
        return false if data.length == 0

        key = data[0]
        value = data[1]

        if data.length > 2
            readonly = data[2]
        else
            readonly = false

        Store[key] = new Value() unless Hash(Store).has key

        return false if Store[key].readOnly()

        Store[key].set value, readonly

        true

    get: (key) ->
        values = []

        for k in key
            if k == '/'
                continue

            if Hash(Store).has k
                values.push Store[k].get()
            else
                values.push false

        return values

    getStore: ->
        Store

    setStore: (store) ->
        for key of store
            Store[key] = new Value()
            Store[key].set store[key].value, store[key].readonly

    getJSONfiedStore: ->
        JSON.stringify Store
