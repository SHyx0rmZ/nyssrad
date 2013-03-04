response = null
data = null

get = ->
    response

set = (resp) ->
    response = resp

build = (d) ->
    if !response
        return false

    obj =
        response: d

    data = d = JSON.stringify obj

send = ->
    try
        JSON.parse data
        response.writeHead 200, { "Content-Type": "application/json" }
    catch e
        response.writeHead 200, { "Content-Type": "text/plain" }

    response.write data
    response.end()

exports.set = set
exports.get = get
exports.build = build
exports.send = send
