module.exports =
    route: (path, handle) ->
        if path == "/favicon.ico"
            return

        switch path.substr(0, 5)
            when '/set/'
                handle["/set"] path.substr 5, path.length
            when '/get/'
                handle["/get"] path.substr 5, path.length
            else
                if typeof handle[path] == 'function'
                    handle[path]()
                else
                    console.log "[ route ] No handle found for " + path
