#!/bin/sh

#-----------------------------EDIT HERE------------------------------#
NODE=node
NPM=npm
#-----------------------------STOP HERE------------------------------#

echo " Checking your setup..."; echo ""

${NODE} --version &> /dev/null

if [ $? -ne 0 ]
then
    echo " ! node.js not found! Please install it or adjust the path in prereq.sh";
    exit
else
    echo " * node.js found"
fi


${NPM} --version &> /dev/null 

if [ $? -ne 0 ]
then
    echo " ! npm not found! You have node.js installed, so you probably have to set"
    echo "   the npm-path in prereq.sh correctly"
else
    echo " * npm found"
fi


echo "require('hashish');" > test.js
node test.js &> /dev/null

# 
if [ $? -ne 0 ]
then
    echo -n " ! hashish not found, installing..."

    npm install hashish &> npm.install

    if [ $? -ne 0 ]
    then
        echo "failed!"
        echo " ! Failed installing npm! Please check npm.install"
    else
        rm npm.install
    fi
else
    echo " * hashish found"
fi

rm test.js &> /dev/null

echo " "; echo " Your setup looks complete. You can now run bin/nyssrad!"

