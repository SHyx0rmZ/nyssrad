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
var config = {
    /**
     * Settings for store (known stores, flushing intervals etc.)
     **/
    'store': {
        // Set this to false to deactivate automatic flushing at shutdown
        'use_default': true,

        // Does (whyever) a default file with the same time exist,
        // allow it to overwrite (or not)
        'overwrite_default': true,

        /**
         * nyssrad can flush the complete key-value store every n seconds
         **/
        'flush': {
            // Set this to true to active automatic flushing every n seconds
            'interval': false,
            'seconds': 60,
        },

        /**
         * Add here all stores you want to use in nyssrad. Put the names 
         * between ''.
         **/
        'stores': {
            // You can change the name of the default store, but this
            // is not recommended
            'default': 'default.store'
            /**
             * For now, you can specify your store here:
             * 'store': 'mystore.store'
             **/
        }
    }
};

exports.config = config;

