//create variable to hold db connection
let db;

//establish connection to IndexedDB database called 'pizza-hunt'
//and set it to version 1
const request = indexedDB.open('pizza-hunt', 1);

//event listener is created when we open the connection
// using the .open() method

//as part of the browser's window object, indexedDB is a global
// variable. Thus we could say window.indexedDB. but dont need to
//The .open() method takes the following to params
// 1. name of the IndexedDB database you'd like to create
// (if it doesn't exists) or connect to (if it does exist).
// 2. the version of the database. By default, it starts at 1.
// this param is used to determine whether the db's structure
// has changed between connections. similar to changing
// columns in a SQL database.

// this event will emit if the db version changes
// (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
  //save a reference to the database
  const db = event.target.result;
  //create an object store (table) called 'new_pizza'
  // set it to have an auto incrementing primary key of sorts
  db.createObjectStore('new_pizza', { autoIncrement: true });
};

//onupgradeneeded event will emit the first time the code runs
// and create the 'new_pizza' object store.
// it doesn't run again unless the db gets deleted from the browser
// or we change the version number in the .open() method to a value of 2
// which indicates the db needs an update

//when the event is executed, stored is a locally scoped connection to the db
// and use the .createObjectStore() method to create the object store
// that holds the pizza data.

//with indexedDb we have a veritable blank slate which we need
// to establish all the rules for working with the database

// for this reason we create the new_pizza object store, and
// also instruct the store to have an autoincrementing index for 
// each new set of data inserted.
// otherwise getting data will be difficult.

//upon successful request
request.onsuccess = function(event) {
  //when db is successfully crated with its object store
  // (from onupgradedneeded event above) or simply
  // established a connection, save a reference to db
  // in a global variable
  db = event.target.result;

  //check if app is online, if yes run uploadPizza() function
  // to send all local db data to api
  if (navigator.onLine) {
    //not created yet but soon, 
    // uploadPizza();
  }
};

request.onerror = function(event) {
  //log error here
  console.log(event.target.errorCode);
};

//onsuccess, its set up so that when we finalize the
// connection to the db, we cans tore the resulting db object
// to the global variable. the event also emits everytime we 
// interact with the db, so everytime that it runs,
// we check to see if the appi s connected to the internet.
// If its connected execute uploadPizza(); 

//onerror, event handler informs if anything ever goes wrong
// with the db interaction

//this function will be executed if attempting to submit a new pizza
function saveRecord(record) {
  //open a new transaction with the database with read and write permissions
  const transaction = db.transaction([ 'new_pizza' ], 'readwrite');

  //access the object store for 'new_pizza'
  const pizzaObjectStore = transaction.objectStore('new_pizza');

  //add record to store with add method
  pizzaObjectStore.add(record);
}

//indexedDb doesn't have the luxury of direct connection to 
// a db like SQL or mongoDB databases, so CRUD methods 
// aren't available all the time. instead we have to 
// explicitly open a transaction, or temp connections to the db
// helps the indexedDB db maintain an accurate reading of the 
// data it stores so that data isn't in flux all the time.

//once a transaction is open, can directly access new_pizza object store
// because this is where we'll be adding data.
// finally, we use the object store's .add() method to insert data
// into the new_pizza object store.

//saverecord() function will be used in add-pizza.js's form submission function
// if the fetch() function's catch block is executed
// which always executes on a network failure

//now if a user submits a new pizza without internet
// instead of the app failing, the data is stored in the 
// new_pizza object store in the browsers indexedDB db called
// pizza_hunt

function uploadPizza() {
  //open a transaction on your db
  const transaction = db.transaction([ 'new_pizza' ], 'readwrite');

  //access your object store
  const pizzaObjectStore = transaction.objectStore('new_pizza');

  //get all records from store and set to a variable
  const getAll = pizzaObjectStore.getAll();

  //upon successful .getAll() exec, run this function
  getAll.onsuccess = function() {
    //if there was data in the idb's store, lets send it to the 
    // api server
    if (getAll.result.length > 0) {
      fetch('/api/pizzas', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(json => {
        if (json.message) {
          throw new Error(json);
        }
        //open one more transaction
        const transaction = db.transaction([ 'new_pizza' ], 'readwrite');
        //access the new_pizza object store
        const pizzaObjectStore = transaction.objectStore('new_pizza');
        //clear all items in the store
        pizzaObjectStore.clear();

        alert('All saved pizza has been submitted!');
      })
      .catch(e => console.log(e));
    }
  }
}

/**
 * Now the getAll.onsuccess event will execute after the .getAll() method completes successfully. 
 * At that point, the getAll variable we created above it will have a .result property that's an array 
 * of all the data we retrieved from the new_pizza object store.

If there's data to send, we send that array of data we just retrieved to the server at the POST 
/api/pizzas endpoint. Fortunately, the Mongoose .create() method we use to create a pizza can handle either single objects or an 
array of objects, so no need to create another route and controller method to handle this one event.

On a successful server interaction, we'll access the object store one more time and empty it, 
as all of the data that was there is now in the database.

Now let's test this out. First, navigate up to the request.onsuccess event handler we created earlier 
and uncomment the call to uploadPizza(). With this uncommented, we'll check to see if we're online every time 
this app opens and upload any remnant pizza data, just in case we left the app with items still in the local IndexedDB database. 
That way, users won't have to worry about staying in the app to ensure the data is eventually uploaded—it'll 
do that for them next time they return! 
 * 
 * 
 */

//listen for app coming back online
//when online send pizza that was made while offline
window.addEventListener('online', uploadPizza);