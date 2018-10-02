# README #

This README describes how to install and customise this for individual use.

## Install Guide ##
The following should be installed locally or globally using node.js
* npm install morgan
* npm install express
* npm install fs
* npm install path
* npm install mysql

Usinging OpenSSL generate two files follow this guide to generate files. 
 - https://rietta.com/blog/2012/01/27/openssl-generating-rsa-key-from-command/

## Basic Usage ##
Any variables are stored in constants.js - to customise your application change this file to suit your needs.

Listener.js sets up a server either http, https or both. This can be configured within th constants.js file

app.js is used to handle any incomming requests via https and can be configured to use basic authentication as well as logging any incomming traffic

## TODO ##
* Complete basic auth information from server for multiple users
* 
