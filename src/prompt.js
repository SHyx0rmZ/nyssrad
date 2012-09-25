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
var colors = require('colors');
var store = require('./store');
var utils = require('./utils');

var commands = { };
commands.set = store.set;
commands.get = store.get;
commands.exit = utils.exit;
commands.quit = utils.exit;


function prompt()
{
    cmd.prompt('> ', function(data) {
        parse(data);
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
            console.log(result.toString().green);
        } else {
            console.log("false".red);
        }
    }
}

exports.prompt = prompt;

