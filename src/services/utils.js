import {
    getFirestore,
    collection,
    runTransaction,
    doc
} from "firebase/firestore";

const getCurrentTime = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String((date.getMonth() + 1)).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

const updateControl = async (colName, controlData, deviceData) => {
    const db = getFirestore();
    const colRef = collection(db, colName);
    try {
        await runTransaction(db, async (transaction) => {
            transaction.set(doc(colRef), deviceData);
            transaction.set(doc(collection(db, 'control')), controlData);
        });
        console.log("Transaction successfully committed!");
    } catch (e) {
        console.log("Transaction failed: ", e);
    }
};

export {
    getCurrentTime,
    updateControl
}