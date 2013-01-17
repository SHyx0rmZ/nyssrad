/******************************************************************************
 * Copyright (c) 2012 Alexander Kluth <derhartmut@niwohlos.org>               *
 *                                                                            *
 * Permission is hereby granted,  free of charge,  to any  person obtaining a *
 * copy of this software and associated documentation files (the "Software"), *
 * to deal in the Software without restriction,  including without limitation *
 * the rights to use,  copy, modify, merge, publish,  distribute, sublicense, *
 * and/or sell copies  of the  Software,  and to permit  persons to whom  the *
 * Software is furnished to do so, subject to the following conditions:       *
 *                                                                            *
 * The above copyright notice and this permission notice shall be included in *
 * all copies or substantial portions of the Software.                        *
 *                                                                            *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR *
 * IMPLIED, INCLUDING  BUT NOT  LIMITED TO THE WARRANTIES OF MERCHANTABILITY, *
 * FITNESS FOR A PARTICULAR  PURPOSE AND  NONINFRINGEMENT.  IN NO EVENT SHALL *
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER *
 * LIABILITY,  WHETHER IN AN ACTION OF CONTRACT,  TORT OR OTHERWISE,  ARISING *
 * FROM,  OUT OF  OR IN CONNECTION  WITH THE  SOFTWARE  OR THE  USE OR  OTHER *
 * DEALINGS IN THE SOFTWARE.                                                  *
 ******************************************************************************/
var fs = require('fs');
var config = require('./config');
var store = require('./store');
var log = require('./log');

var thisStore;


/**
 * Flush the whole store into the default/a store.
 *
 * @param storename
 * @return true if success, false if no success, nothing if there's nothing to flush
 **/
function flush(storename)
{
    var filename = "";

    if (storename.length > 0) {
        filename = storename[0].toString();
    } else if (typeof thisStore != 'undefined') {
        filename = thisStore;
    } else if (config.store.use_default) {
        filename = config.store.stores.default;
    } else {
        return false;
    }

    var content = store.getJSONfiedStore();

    try {
        fs.writeFileSync(filename, content, 'utf8');
        log.message('Wrote file ' + filename);
        return true;
    } catch (e) {
        log.failure(e);
        log.debug(e.stack);
        return false;
    }
}


/**
 * Load a store from file
 **/
function load()
{
    var filename = "";

    if (thisStore != undefined) {
        filename = thisStore;
    } else if (config.store.use_default == true) {
        filename = config.store.stores.default;
    } else {
        log.debug('Nothing to load');
        return;
    }

    try {
        var content = fs.readFileSync(filename, 'utf8');
        store.setStore(JSON.parse(content));
        config.store.stores.loaded = filename;
        log.success('Successfully loaded ' + filename);
    } catch (e) {
        log.failure(e);
    }
}


function registerFlushing()
{
    setInterval(flush, config.store.flush.milliseconds);
}


function setFilename(filename)
{
    thisStore = filename;
}


exports.flush = flush;
exports.load = load;
exports.registerFlushing = registerFlushing;
exports.setFilename = setFilename;

