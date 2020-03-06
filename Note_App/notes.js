const fs =  require('fs');


// ------------------Begin of Reusable functions ---------------------

var fetchNotes = () => {
  try {                          //if file won't exist
    var notesString = fs.readFileSync('notes-data.json')
    return JSON.parse(notesString);
  } catch(e){
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};


// ------------------End of Reusable functions ---------------------


//  to add a new note

var addNote = (CustomerID,CustomerName,CustomerEmail) => {   
    var notes = fetchNotes();
    var note = {CustomerID,CustomerName,CustomerEmail}

    var duplicateNotes =  notes.filter((note) => { // to check if note already exists
      return note.CustomerID === CustomerID;
    });

    if (duplicateNotes.length === 0){
      notes.push(note);
      saveNotes(notes);
      return note
    }

  };


//to list all the notes

var getAll = () => {
    return fetchNotes();
};


// to read a note

var getNote = (CustomerID) => {
    
    var notes = fetchNotes();

    var getNotes =  notes.filter((note) => {  // to check if note exists and return note
      return note.CustomerID === CustomerID;
    });

    return getNotes[0]

};
//to update
var updateNote = (CustomerID,CustomerName,CustomerEmail) => {
  var notes= fetchNotes();
  var note={CustomerID,CustomerName,CustomerEmail}
 
    for(var i=0;i<notes.length;i++) {
      //console.log(notes.length);
      //console.log('Comparision---', notes[i].CustomerID, CustomerID);
      if(notes[i].CustomerID == CustomerID)
      {
        notes[i].CustomerName= CustomerName;
        notes[i].CustomerEmail= CustomerEmail;
        saveNotes(notes);
        return note;
      }
   
  } 
    
};
// to delete a note

var remove = (CustomerID) => {

    var notes = fetchNotes(); // reusable func

    var filteredNotes =  notes.filter((note) => { // will return all other notes other than "note to be removed"
      return note.CustomerID !== CustomerID;
    });

    saveNotes(filteredNotes); //save new notes array

    return notes.length !== filteredNotes.length
    
};

// function just to print out note to screen

var logNote = (note) => { 
  console.log('--');
  console.log(`CustomerID: ${note.CustomerID}`);
  console.log(`CustomerName: ${note.CustomerName}`);
  console.log(`CustomerEmail: ${note.CustomerEmail}`);
};

// add new function names here to be accessible from other modules

module.exports = {
  addNote, getAll, remove, getNote,logNote,updateNote
};
