nyssrad - a NoSQL key-value database
====================================
     1. INTRODUCTION
     2. REQUIREMENTS
     3. USAGE
     4. API
     5. CONTRIBUTION
     6. LEGAL


1. INTRODUCTION
--------------------
nyssrad is a fast and simple key-value database. You don't need SQL 
statements to get data and set data ("NoSQL"-database). You can think
of nyssrad as a redis-clone. 

nyssrad does not provide complex database structures, stored procedures
or anything a "real" DBMS provides. Instead, it provides a small and
fast API and simple methods to set values with a key and to get them.


2. REQUIREMENTS
--------------------
All requirements are listed in the file DEPENDENCIES. You need at least
node.js and npm.


3. USAGE
--------------------
After running "make" and installing all missing dependencies you can
run "./nyssrad" from the bin directory. After a successful start up
you get a prompt "> ". Now you can either set and get values from
the command line:

    > set hello world
    true
    > get hello
    world
    > set foo bar
    true
    > get foo
    bar
    > get hello foo
    world
    bar

Or you can open your browser and set and get values via the URL:

    http://localhost/set/hello/world

    http://localhost/get/hello

To mark a key-value pair as "final" (not changable), add "true" as a
third parameter for set:

    > set hello world true
    true
    > get hello
    world
    > set hello foo
    false

As you can see, nyssrad returns either true when a operation was 
successful, false when a operation was not successful or the value
associated with a key.

Hint: nyssrad returns the results via http as application/json.
If you want other formats use one of the APIs to access nyssrad.

To run nyssrad as a daemon, simply add "--start" as a parameter.


4. API
-------------------------
nyssrad provides a simple and clean API for several languages.
In the directory api/ you can find all supported languages.

Important: If you want to use the JavaScript API make sure you
have nyssrad\_proxy.php as well shipped with your solution.

The API repository is found here: https://github.com/deralex/nyssrad-api
 
5. CONTRIBUTION
-------------------------
If you have any suggestions or bug reports, send them
to derhartmut@niwohlos.org. If you have patches, send them as git-patches
to the same address.

If you have written a API in a new language send all files or at
lest a link to your repository/website where others can find
your API.


6. LEGAL
-------------------------
 Copyright (c) 2012 Alexander Kluth <derhartmut@niwohlos.org>              
                                                                            
 Permission is hereby granted,  free of charge,  to any  person obtaining a 
 copy of this software and associated documentation files (the "Software"), 
 to deal in the Software without restriction,  including without limitation 
 the rights to use,  copy, modify, merge, publish,  distribute, sublicense, 
 and/or sell copies  of the  Software,  and to permit  persons to whom  the 
 Software is furnished to do so, subject to the following conditions:       
                                                                            
 The above copyright notice and this permission notice shall be included in 
 all copies or substantial portions of the Software.                        
                                                                          
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 IMPLIED, INCLUDING  BUT NOT  LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 FITNESS FOR A PARTICULAR  PURPOSE AND  NONINFRINGEMENT.  IN NO EVENT SHALL 
 THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 LIABILITY,  WHETHER IN AN ACTION OF CONTRACT,  TORT OR OTHERWISE,  ARISING 
 FROM,  OUT OF  OR IN CONNECTION  WITH THE  SOFTWARE  OR THE  USE OR  OTHER 
 DEALINGS IN THE SOFTWARE.                                                  


