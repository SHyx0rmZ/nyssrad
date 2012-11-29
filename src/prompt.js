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
var cmd = require('commander');
var log = require('./log');
var store = require('./store');
var utils = require('./utils');
var data = require('./data');
var aspects = require('./aspects');

var commands = { };
commands.set = store.set;
commands.get = store.get;
commands.export = store.getJSONfiedStore;
commands.exit = utils.exit;
commands.quit = utils.exit;
commands.flush = data.flush;


function prompt()
{
    cmd.prompt('> ', function(promptdata) {
        parse(promptdata);
        prompt();
    });
}


function parse(data)
{
    var tokens = [];
    tokens = data.split(' ');

    // First token must be a function in nyssrad
    if (typeof commands[tokens[0]] === 'function') {
        var result = commands[tokens.shift()](tokens);

        if (result !== false && result !== null) {
            log.data(result);
        } else {
            log.failure("false");
        }
    } else {
        log.message("unknown command " + tokens[0]);
    }
}

exports.prompt = prompt;

