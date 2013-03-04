#!/usr/bin/env coffee
cmd = require './prompt'
server = require './server'
data = require './data'
env = require './env'
config = require './config'
log = require './log'
daemon = require './daemon'
argv = require('optimist').argv

background = false

if argv.start
    background = true

if argv.stop
    daemon.stop()
    env.exit()

if argv.store
    log.warn 'Loading store form file ' + argv.store + ', default store is not loaded!'
    data.setFilename argv.store

if argv.port
    config.server.port = argv.port

if config.store.flush.interval
    data.registerFlushing()

data.load()

if background
    daemon.start()
else
    log.message "\nnyssrad " + env.VERSION + " - noSQL key-value-database"
    log.glitzer "Copyright (C) 2012, 2013 Alexander Kluth <contact@alexanderkluth.com>, Patrick Pokatilo <mail@shyxormz.net>"
    log.message "Distributed under the terms of the MIT license\n"
    cmd.prompt()
