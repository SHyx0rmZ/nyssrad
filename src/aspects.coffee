twill = require 'twill'
store = require './store'
log = require './log'

store_aspect = twill.aspect store, (weave) ->
    weave.after.set (data) ->
