env = require './env'
daemon = require('daemonize2').setup
    main: 'trampoline.js'
    name: 'nyssrad'
    pidfile: 'nyssrad.pid'

daemon.on 'stopped', ->
    env.exit()

module.exports =
    start: ->
        daemon.start()

    stop: ->
        daemon.stop()
