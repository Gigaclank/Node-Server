[![GitHub issues](https://img.shields.io/github/issues/Gigaclank/Node-Server.svg?style=popout)](https://github.com/Gigaclank/Node-Server/issues)
[![GitHub forks](https://img.shields.io/github/forks/Gigaclank/Node-Server.svg?style=popout)](https://github.com/Gigaclank/Node-Server/network)
[![GitHub stars](https://img.shields.io/github/stars/Gigaclank/Node-Server.svg?style=popout)](https://github.com/Gigaclank/Node-Server/stargazers)
[![GitHub license](https://img.shields.io/github/license/Gigaclank/Node-Server.svg?style=popout)](https://github.com/Gigaclank/Node-Server/blob/master/LICENSE.txt)
[![Github all releases](https://img.shields.io/github/downloads/Gigaclank/Node-Server/total.svg)](https://github.com/Gigaclank/Node-Server)

# README #

This README describes how to install and customise this for individual use.

## Install Guide ##
The following should be installed locally or globally using node.js
* npm install morgan
* npm install express
* npm install fs
* npm install path
* npm install mysql
* npm install express-basic-auth
* (npm install morgan express fs path mysql express-basic-auth) - this will install all at the same time

* It may be neccisary to run the following command in mySQL for version 8.0 + 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'


Usinging OpenSSL generate two files follow this guide to generate files. 
 - https://rietta.com/blog/2012/01/27/openssl-generating-rsa-key-from-command/

## Basic Usage ##
Any variables are stored in constants.js - to customise your application change this file to suit your needs.

Listener.js sets up a server either http, https or both. This can be configured within th constants.js file

app.js is used to handle any incomming requests via https and can be configured to use basic authentication as well as logging any incomming traffic

## TODO ##
* Complete basic auth information from server for multiple users

<p align="center" z-index = "-1">
  <img src="https://avatars2.githubusercontent.com/u/12459794?s=200&v=4"/>
</p>