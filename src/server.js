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
var http = require('http');
var spdy = require('spdy');
var url = require('url');
var router = require('./router');
var handle = require('./handle');
var response = require('./response');
var log = require('./log');
var config = require('./config');


function start()
{
    function onRequest(request, resp)
    {
        var pathname = url.parse(request.url).pathname;

        response.set(resp);

        router.route(pathname, handle.getHandles());

        response.send();
    }

    if (config.server.protocol === 'http') {
        http.createServer(onRequest).listen(config.server.port);
    } else if (config.server.protocol === 'spdy') {
        spdy.createServer(onRequest).listen(config.server.port);
    } else {
        // error in config? No problem, nyssrad to the rescue
        http.createServer(onRequest).listen(config.server.port);
    }

    log.message("Started at port " + config.server.port);
}

exports.start = start;

