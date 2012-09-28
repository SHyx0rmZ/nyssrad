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

function flush()
{
    if (config.config.store.use_default == true) {
        // Get the whole store content as a JSON string
        var content = store.getJSONfiedStore();

        fs.writeFileSync(config.config.store.stores.default, content, 'utf8', function(error) {
            if (error) {
                console.log(error);
            } else {
                console.log('Wrote contents to disk (' + config.config.store.stores.default + ')');
            }
        });
    }
}

function load()
{
    if (config.config.store.use_default == true) {
        console.log('Loading contents from ' + config.config.store.stores.default + '...');
        var content = fs.readFileSync(config.config.store.stores.default, 'utf8', function(error) {
            if (error) {
                //console.log(error);
                console.log("Error while loading default store");
            } else {
                console.log('Loaded default store ' + config.config.store.stores.default);
            }
        });

        store.setStore(JSON.parse(content));
        console.log('Done loading.');
    } //else {
}

exports.flush = flush;
exports.load = load;

