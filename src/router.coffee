route = (path, handle) ->
    if path == "/favicon.ico"
        return

    if path.substr(0, 5) == '/set/'
        handle["/set"] path.substr 5, path.length
    else if path.substr(0, 5) == '/get/'
        handle["/get"] path.substr 5, path.length
    else if typeof handle[path] == 'function'
        handle[path]()
    else
        console.log "[ route ] No handle found for " + path

exports.route = route
