daemon = require('daemonize2').setup
    main: 'nyssrad.js'
    name: 'nyssrad'
    pidfile: 'nyssrad.pid'

daemon.on 'stopped', ->
    env.exit()

module.exports =
    start: ->
        process.argv.push '--server'
        daemon.start().once 'started', ->
            process.exit()

    stop: ->
        daemon.stop().once 'stopped', ->
            process.exit()
