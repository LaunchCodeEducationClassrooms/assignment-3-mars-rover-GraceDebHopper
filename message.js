//const Command = require('./command.js');   
//added; don't need - tests work w/ *** below - with or without this import (same level ./) 

class Message {
    constructor(name, commands) {
     this.name = name;
     if (!name) {
       throw Error('Message name required.');
     }
     this.commands = commands;                      //***
   }
 
}

module.exports = Message;