#!/bin/sh

#-----------------------------EDIT HERE------------------------------#
NODE=node
#-----------------------------STOP HERE------------------------------#

${NODE} --version 2> /dev/null

if [ $? -ne 0 ]
then
    echo "node.js not found! Please install it or adjust the path in prereq.sh";
fi

echo "require('hashish');" > test.js
node test.js 2> /dev/null

# 
if [ $? -ne 0 ]
then
    npm install hashish
fi
