
const fs =  require('fs');
const yargs = require('yargs');

const notes = require('./notes.js');

// ------------ Begin - command configuration -----------------


const CustomerID1 = {
    describe: 'ID of the customer',
    demand : true,
    alias : 'c'
}

const CustomerName1 = {
    describe: 'Name of the customer',
    demand : true,
    alias : 'n'
}
const CustomerEmail1 = {
  describe: 'Email of the customer',
  demand : true,
  alias : 'e'
}
const argv =  yargs

    .command('add','Add a new note',{
      CustomerID: CustomerID1,
      CustomerName: CustomerName1,
      CustomerEmail:CustomerEmail1
    })
    .command('update','update a new note',{
      CustomerID: CustomerID1,
      CustomerName: CustomerName1,
      CustomerEmail:CustomerEmail1
    })
    .command('list','List all notes')
    .command('read','Read a note',{
      CustomerID: CustomerID1
    })
    .command('remove','Remove a Note',{
      CustomerID: CustomerID1
    })
    .help()
    .argv;


// ------------ End - command configuration -----------------


var command = yargs.argv._[0];


if (command === 'add'){
    var note = notes.addNote(argv.CustomerID,argv.CustomerName,argv.CustomerEmail);
    if (note){
      notes.logNote(note);                                //add a new note
    } else{
      console.log("Note doesnot already exists");
    }
}

else if (command === 'list') {
  var AllNotes = notes.getAll();
  console.log(`Printing ${AllNotes.length} note(s).`);
  AllNotes.forEach((note)=>{                                //list all note(s)
    notes.logNote(note);
  });
}

else if (command === 'read') {
   var note = notes.getNote(argv.CustomerID);
   if(note){
    notes.logNote(note);                                //read a note 
          }
   else{
    console.log("Note not found");
   }
}
else if(command === 'update')
{

  var note= notes.updateNote(argv.CustomerID,argv.CustomerName,argv.CustomerEmail);
  if (note){
    notes.logNote(note);
  }
  else{
    console.log("Note doesn't exists. Please add customer details.");
  }
}
else if (command === 'remove') {
    var noteRemoved = notes.remove(argv.CustomerID);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
}

else{
  console.log('command note recognized'); 
}
