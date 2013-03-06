colors = require 'colors'
config = require './config'

if config.env.colors
    colors.setTheme
        glitzer: 'rainbow'
        input: 'grey'
        verbose: 'cyan'
        prompt: 'grey'
        success: 'green'
        data: 'white'
        help: 'cyan'
        warn: 'yellow'
        debug: 'yellow'
        error: 'red'
        message: 'white'

else
    colors.setTheme
        glitzer: 'grey'
        input: 'grey'
        verbose: 'grey'
        prompt: 'grey'
        success: 'grey'
        data: 'grey'
        help: 'grey'
        warn: 'grey'
        debug: 'grey'
        error: 'grey'
        message: 'grey'

module.exports =
    success: (str) ->
        console.log str.toString().success

    failure: (str) ->
        console.log str.toString().error

    debug: (str) ->
        if config.env.debug
            console.log str.toString().debug

    warn: (str) ->
        console.log str.toString().warn

    message: (str) ->
        console.log str.toString().message

    data: (str) ->
        console.log str.toString().data

    glitzer: (str) ->
        console.log str.toString().glitzer
