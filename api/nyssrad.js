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

/**
 * This is a simple and example API for using nyssrad.
 * For the future I will provide APIs in many different languages
 * (for each language an own repo).
 *
 * The API let you send a request and store a key as well as getting
 * a value from a given key or many values stored in a JSON object.
 *
 * To avoid having too many dependencies we will use the good old
 * XMLHttpRequest object instead of f.e. jQuery for AJAx calls.
 **/

var Nyssrad = function()
{

}


// Uses for AJAX access (web 2.0 wooo pew pew pew yay yay yay)
Nyssrad.prototype.ajax = new XMLHttpRequest();


/**
 * localhost at port 8888 is the default nyssrad-path.
 **/
Nyssrad.prototype.url = "http://localhost:8888";


Nyssrad.prototype.getValue = function(key, callback)
{
    this.ajax.open('GET', this.url + '/get/' + key, true);

    if (this.ajax.readyState == 4) {
        var result = this.ajax.responseText;
        callback(result);
    } else {
        callback(null);
    }

    this.ajax.send(null);
}


Nyssrad.prototype.setValue = function(key, value, callback)
{
    this.ajax.open('GET', this.url + '/set/' + key + '/' + value, true);

    if (this.ajax.readState == 4) {
        var result = this.ajax.responseText;

        if (result == 'true') {
            callback(true);
        } else {
            callback(false);
        }
    }

    this.ajax.send(null);
}


