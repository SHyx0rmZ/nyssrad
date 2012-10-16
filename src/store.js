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
var Hash = require('hashish');
var config = require('./config');
var log = require('./log');

var Value = function() {
    var value;
    var readonly = false;

    this.set = function(value, readonly) {
        this.value = value;
        if (readonly) {
            this.readonly = true;
        } else {
            this.readonly = false;
        }
    };

    this.get = function() {
        return this.value;
    };

    this.readOnly = function() {
        return this.readonly;
    };
};


var Store = { };


/**
 * Set a key-value pair
 *
 * @param data First field is the key, second the value
 * @return true if the key could be stored successfully, false otherwise or if the key is readonly
 **/
function set(data)
{
    if (data.length == 0) {
        return false;
    }

    var key = data[0];
    var value = data[1];
    var readonly;

    var return_value;

    if (data.length > 2) {
        readonly = data[2];
    } else {
        readonly = false;
    }

    if (Hash(Store).has(key)) {
        if (Store[key].isSticky()) {
            return_value = false;
        } else {
            Store[key].set(value, readonly);
            return_value = true;
        }
    } else {
        Store[key] = new Value();
        Store[key].set(value, readonly);
        return_value =  true;
    }

    return return_value;

}


/**
 * Get a value from a specified key
 *
 * @param key The specified key
 **/
function get(key)
{
    var values = [];

    // Iterate through all keys and push the associated value
    // into the values array.
    for (k in key) {
        if (key[k] === '/') {
            continue;
        }

        if (Hash(Store).has(key[k])) {
            values.push(Store[key[k]].get());
        } else {
            values.push(false);
        }
    }

    return values;
}


/**
 * @return The store
 **/
function getStore()
{
    return Store;
}


/*
 * Add a new store to the current store
 *
 * @param store The new store
 **/
function setStore(store)
{
    for (key in store) {
        Store[key] = new Value();
        Store[key].set(store[key].value, store[key].readonly);
    }
}


/**
 * @return The complete store as a JSON string
 **/
function getJSONfiedStore()
{
    return JSON.stringify(Store);
}


/**
 * Exports
 **/
exports.set = set;
exports.get = get;
exports.name;
exports.getStore = getStore;
exports.getJSONfiedStore = getJSONfiedStore;
exports.setStore = setStore;

