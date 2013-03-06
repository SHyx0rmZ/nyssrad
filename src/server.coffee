http = require 'http'
spdy = require 'spdy'
url = require 'url'
router = require './router'
handle = require './handle'
response = require './response'
log = require './log'
config = require './config'

module.exports =
    start: ->
        onRequest = (request, resp) ->
            pathname = url.parse(request.url).pathname

            response.set resp

            router.route pathname, handle.getHandles()

            response.send()

        switch config.server.protocol
            when 'http'
                http.createServer(onRequest).listen config.server.port
            when 'spdy'
                spdy.createServer(onRequest).listen config.server.port
            else
                http.createServer(onRequest).listen config.server.port

        log.message "Started at port " + config.server.port
