#!/usr/bin/env node
'use strict';

const cmd = require('./lib/cmd')

const args = require('yargs').argv;
switch(args.option.toLowerCase()){
case "deploy":
    cmd.createFunction();
    break;
case "getfunction":
    cmd.getFunction();
    break;    
case "createuser":
    cmd.createUser();
    break;
default:
    console.log("invalid option: " + args.option);
}
