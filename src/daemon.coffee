env = require './env'
daemon = require('daemonize2').setup
    main: 'trampoline.coffee'
    name: 'nyssrad'
    pidfile: 'nyssrad.pid'

daemon.on 'stopped', ->
    env.exit()

start = ->
    daemon.start()

stop = ->
    daemon.stop()

exports.start = start
exports.stop = stop
