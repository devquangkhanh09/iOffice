const admin = require('firebase-admin');

const serviceAccount = require('./server/smart-office-eb912-firebase-adminsdk-o8aow-8662155d09.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports = db;