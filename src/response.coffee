response = null
data = null

module.exports =
    get: ->
        response

    set: (resp) ->
        response = resp

    build: (d) ->
        if !response
            return false

        obj =
            response: d

        data = d = JSON.stringify obj

    send: ->
        try
            JSON.parse data
            response.writeHead 200, { "Content-Type": "application/json" }
        catch e
            response.writeHead 200, { "Content-Type": "text/plain" }

        response.write data
        response.end()
