import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Logic to a method that accepts some content and Adds it to the database.
export const putDb = async (content) => {

  // With variable jateDb - create a connection to the database database and version we want to use.
  const jateDb = await openDB('textEditor', 1);

  // With variable tx - create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('textEditor', 'readwrite');
  
  // Open up the desired object store.
  const store = tx.objectStore('textEditor');

  // Pass in the content.
  const request = store.put({ id: 1, value: content});

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
}

// Get all the content from the database
export const getDb = async () => {
    
    // With variable jateDb - create a connection to the database database and version we want to use.
    const jateDb = await openDB('textEditor', 1);

    // With variable tx - create a new transaction and specify the database and data privileges.
    const tx = jateDb.transaction('textEditor', 'readonly');
    
    // Open up the desired object store.
    const store = tx.objectStore('textEditor');
    
    // Get first set of data in the database.
    const request = store.get(1);

    // Get confirmation of the request.
    const result = await request;
    result
      ? console.log('🚀 - data retrieved from the database', result.value)
      : console.log('🚀 - data not found in the database');
    return result?.value;
};

// Start the database.
initdb();
