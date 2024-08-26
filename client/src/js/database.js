import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database

//exports a function to POST to the database
export const putDb = async (content) => {
  console.log("PUT to the database");
  //creates a connection to the database database and version
  const textDB = await openDB("jate", 1);

  //creates a new transaction and specify the database and data privileges
  const tx = textDB.transaction("jate", "readwrite");

  //opens up the desired object store
  const store = tx.objectStore("jate");

  //uses the .put() method on the store and pass in the content
  const request = store.put({ id: 1, value: content });

  //gets confirmation of the request
  const result = await request;
  console.log("Data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database

export const getDb = async () => {
  console.log("GET all notes from the database");
  //creates a connection to the database database and version we want to use
  const textDB = await openDB("jate", 1);

  //creates a new transaction and specify the database and data privileges
  const tx = textDB.transaction("jate", "readonly");

  //opens up the desired object store
  const store = tx.objectStore("jate");

  //uses the .getALL() method to get all data in the database
  const request = store.getAll();

  //gets confirmation of the request
  const result = await request;
  console.log("result.value", result);
  return result?.value;
};

initdb();
