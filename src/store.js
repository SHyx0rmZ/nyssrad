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

var Value = function() {
    var value;
    var sticky = false;

    this.set = function(value, sticky) {
        this.value = value;
        if (sticky) {
            this.sticky = true;
        } else {
            this.sticky = false;
        }
    };

    this.get = function() {
        return this.value;
    };

    this.isSticky = function() {
        return this.sticky;
    };
};


var Store = { };


/**
 * Set
 **/
function set(data)
{
    var key = data[0];
    var value = data[1];
    var sticky;

    if (data.length > 2) {
        sticky = data[2];
    } else {
        sticky = false;
    }

    if (Hash(Store).has(key)) {
        if (Store[key].isSticky()){
            return false;
        } else {
            Store[key].set(value, sticky);
            return true;
        }
    } else {
        Store[key] = new Value();
        Store[key].set(value, sticky);
        return true;
    }
}


/**
 *
 **/
function get(key)
{
    if (key.length > 1) {
        var values = new Array();

        // Iterate through all keys and push the associated value
        // into the values array.
        for (k in key) {
            if (Hash(Store).has(key[k])) {
                values.push(Store[key[k]].get());
            }
        }

        return values;
    } else {
        if (Hash(Store).has(key)) {
            return Store[key].get();
        } else {
            return false;
        }
    }
}

exports.set = set;
exports.get = get;
