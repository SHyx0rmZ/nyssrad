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
var store = require('./store');
var response = require('./response');

var handle = { };


/**
 * get method, get a key from the store, build a response and send it
 *
 * @return value The value associated with the key, null otherwise
 **/
function get(param)
{
    console.log('[ store  ] Value for key ' + param + ': ' + store.get(param));

    if (!store.get(param)) {
        response.build("false");
    } else {
        response.build(store.get(param));
    }
}


/**
 * Set a key and a value
 *
 * @return true on success, false otherwise
 **/
function set(param)
{
    var keyValue = param.split('/');
    store.set(keyValue[0], keyValue[1]);

    response.build("true");

    console.log("[ store  ] Inserting key " + keyValue[0] + " with value " + keyValue[1]);
}


function root()
{
    response.build("nyssrad 0.1 beta - powered by node.js");
}

// / is the root handle, does nothing
// /get is followed by a key, e.g. /get/mykey
// /set is followed by a key and a valeue, e.g. /set/mykey/myvalue
handle["/"] = root;
handle["/get"] = get;
handle["/set"] = set;


function getHandles()
{
    return handle;
}

exports.getHandles = getHandles;

