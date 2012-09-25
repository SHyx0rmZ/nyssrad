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
    if (param.substr(param.length-1, param.length) === '/') {
        param = param.slice(0, -1);
    }

    var params = param.split('/');

    if (!store.get(params)) {
        response.build("false");
    } else {
        response.build(store.get(params));
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
    store.set(keyValue);

    response.build("true");
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

