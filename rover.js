//*****THRU MY TEST 13 PASSES!
//BUT.. reponse prints commands & roverStatus (in incoorect order) w/ other commands too - how to update rover status without printing it (including in results) 

//Tests pass with or without these imports (same level ./)
//const Message = require('./message.js');    
//const Command = require('./command.js');

class Rover {
   // Write code here!
   constructor(position, mode, generatorWatts = 110) {
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = generatorWatts;
   } //end of constructor


   receiveMessage(message){ 
     //console.log(message);
     //console.log(message.commands.length);                            
     
     let response = {                       
       message: message.name,           //****passed
       results: message.commands,       //****passed thru test 13 but printing in all results
                         
    }; //end of let response


let roverStatus = new Rover();      //******worked to pull in curr status
          
//console.log(roverStatus);           
//console.log(roverStatus.mode);


      for(let i= 0; i < message.commands.length; i++) {              
          
    //for(let i = 0; i < response.results.length; i++){             //worked also
        

        if(message.commands[i].commandType === 'STATUS_CHECK') {      //worked
        //if (response.results[i].commandType === 'STATUS_CHECK') { /worked too *****success checks
          
          response.results[i].completed = true;         
          response.results[i].roverStatus = roverStatus;

        } else if (message.commands[i].commandType === "MODE_CHANGE") {
              //response.results[i].roverStatus = roverStatus;      //****** if *commented out *******
              //Failure: TypeError: Cannot set property 'mode' of undefined at Line 49
              // Failure tests 8-13 except test 10 which relates to above status check if stmt for 1st related command
              //How not to print? 
              // chgd Line 49 to  / roverStatus.mode = message.commands[i].value; and commented out applicable things not needed to print in specs  
              response.results[i].completed = true; 
              //response.results[i].roverStatus.mode = message.commands[i].value; //Line 49 related failure
              roverStatus.mode = message.commands[i].value; //works too in addition to 1st line if not commented out 
                  
        } else if(message.commands[i].commandType === 'MOVE' && roverStatus.mode !== 'LOW_POWER'){
                //response.results[i].roverStatus = roverStatus;        //***** if *commented out******
                //Failure: TypeError: Cannot set property 'position' of undefined at Line 55
                //Failure tests 10-13 
                //- how not to print? chgd Line 49 to  / roverStatus.position = message.commands[i].value; and commented out applicable things not needed to print in specs
                response.results[i].completed = true;
                //response.results[i].roverStatus.position = message.commands[i].value; //Line 55 related failure
                roverStatus.position = message.commands[i].value; //works too in addition to 1st line if not commented out
        
        } else { 
             response.results[i].completed = false;
             //response.results[i].roverStatus = roverStatus;           //**** if *commented out****
             //Failure: TypeError: Cannot read property 'generatorWatts' of undefined at Spec Test 12 (line 118) and spec Test 13 (line 153) - how not to print?
        }
        

    } //end of for loop
     
//console.log(response);   //*****response contains message for all type of commands
   
    return response;
    

  } //end of function
    
} //end of class

module.exports = Rover;