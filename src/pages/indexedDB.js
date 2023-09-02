// build a namespace object
export const indexedDBStorage = {};

if (!('indexedDB' in window)) {
    alert("This browser doesn't support IndexedDB");
}

indexedDBStorage.saveToIndexedDB = function (key, object) {
    return new Promise(
        (resolve, reject) => {

            try {
                // if (object.id === undefined) reject(Error('object has no id.'));
                var dbRequest = indexedDB.open('CostDatabase', 1);

                dbRequest.onerror = function (event) {
                    alert("IndexedDB database error");
                    reject(Error("IndexedDB database error"));
                };

                dbRequest.onupgradeneeded = function (event) {
                    var database = event.target.result;
                    var objectStore = database.createObjectStore(key, { keyPath: "id" });
                };

                dbRequest.onsuccess = function (event) {
                    var database = event.target.result;
                    var transaction = database.transaction('costs', 'readwrite');
                    var objectStore = transaction.objectStore('costs');
                    // var objectRequest = objectStore.put(object); // Overwrite if exists
                    var objectRequest = objectStore.add(object); // Overwrite if exists

                    objectRequest.onerror = function (event) {
                        alert("Error text");
                        reject(Error('Error text'));
                    };

                    objectRequest.onsuccess = function (event) {
                        alert("Data saved OK");
                        resolve('Data saved OK');
                    };
                };


                resolve();
            } catch (error) {
                reject(error);
            }
        }

    )
}

indexedDBStorage.getAllItems = function (keyID, object) {
    return new Promise(
        (resolve, reject) => {

            const request = indexedDB.open(keyID);

            request.onerror = function (event) {
                reject(new Error("IndexedDB error: " + event.target.errorCode));
            };
            request.onsuccess = function (event) {
                const db = event.target.result;
                const transaction = db.transaction(object, "readonly");
                const objectStore = transaction.objectStore(object);
                const items = {};

                objectStore.openCursor().onsuccess = function (event) {
                    const cursor = event.target.result;
                    if (cursor) {
                        items[cursor.key] = cursor.value;
                        cursor.continue();
                    } else {
                        resolve(items);
                    }
                };
            };
            request.onupgradeneeded = function (event) {
                // Handle database version upgrades or creation here if needed
            };
        })
}


window.indexedDBStorage = indexedDBStorage;
console.log(window);