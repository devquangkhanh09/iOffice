const admin = require('firebase-admin');

const serviceAccount = require('./smart-office-eb912-firebase-adminsdk-o8aow-8662155d09.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const sendDataToFirebase = async ({
  feed,
  value,
  timestamp
}) => {
  const db = admin.firestore();
  const colRef = db.collection(feed);
  try {
    const docRef = await colRef.add({
      value,
      timestamp
    });

    console.log(`Document written in ${feed} with ID: ${docRef.id}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  sendDataToFirebase,
  admin
};