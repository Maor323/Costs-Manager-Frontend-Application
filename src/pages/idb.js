export const idb = {
    db: null,
};

idb.openCostsDB = async function (dbName, version) {
    return new Promise((resolve, reject) => {

        // Different web browsers might have different implementations and create the indexedDB
        const indexedDB = window.indexedDB || window.mozIndexedDB ||
            window.webkitIndexedDB
            || window.msIndexedDB;

        // Checking whether the web browser supports the IndexedDB database
        // if it doesn't then showing a message saying so
        if (!indexedDB) {
            console.log("The web browser doesn't support IndexedDB");
        }

        // Let us open our database:
        const request = window.indexedDB.open(dbName, version);

        request.onerror = (event) => {
            reject('Error with opening DB: ' + event.target.error);
        };

        request.onsuccess = (event) => {
            this.db = event.target.result;
            resolve(idb);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore('costs', { keyPath: 'id' });
        };
    });
}

idb.addCost = async function (cost) {
    return new Promise((resolve, reject) => {
        if (!this.db) {
            reject('Database not initialized');
            return;
        }

        // Add current date property 
        // cost.date = new Date();
        // Generate id and add to item 
        // cost.id = Math.floor(Math.random() * 101)

        // Create an object store on the transaction
        const transaction = this.db.transaction(['costs'], 'readwrite');

        // Make a request to add our new item object to the object store
        const objectStore = transaction.objectStore('costs');
        console.log(cost);
        const request = objectStore.add(cost);

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject('Error with adding item: ' + event.target.error);
        };
    });
}


idb.getAllItems = async function () {
    return new Promise((resolve, reject) => {
        if (!this.db) {
            reject('Database not initialized well');
            console.log('Database not initialized well');
            return;
        }

        const transaction = this.db.transaction(['costs'], 'readonly');
        const objectStore = transaction.objectStore('costs');
        const request = objectStore.getAll();
        console.log('request : ' + request);

        request.onerror = (event) => {
            reject('Error with getting the items: ' + event.target.error);
            console.log('Error with getting the items');
        };

        request.onsuccess = (event) => {
            const costs = event.target.result;
            console.log('all costs:' + costs);
            resolve(costs);
        };
    });
}

window.idb = idb;