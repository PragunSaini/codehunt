const functions = require('firebase-functions');
const admin = require('firebase-admin');
let serviceAccount = require(__dirname + '/serviceAccountKey.json');

var links = require('./links.json');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// USER VARIABLE
let isLogged = {uid: null};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://pleasework-98e56.firebaseio.com'
});

const db = admin.firestore();
const users = db.collection('users');

app.use(express.static(__dirname + '/public'));

app.post('/', (req, res) => {
    if (isLogged.uid){
        res.json({
            email: isLogged.email
        });
    }
    else {
        res.json({
            email: null
        });
    }
})

app.post('/html/datastructurespost.html', (req, res) => {

    if (req.body.remove){
        users.doc(isLogged.uid).collection('links').doc(req.body.remove).delete().then(function() {
            console.log("Document successfully deleted!");
        })
        .catch(function(error) {
            console.error("Error writing deleting: ", error);
        });
    }
    else {
        users.doc(isLogged.uid).collection('links').doc(req.body.add).set({
            link: req.body.add
        }).then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

    // db.collection("users").doc(isLogged.uid).collection('links').get().then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ");
    //     });
    // });
    res.send('Pragun ROCKS!!');
})

app.post('/html/datastructures.html', (req, res) => {
    if (isLogged.uid){
        links["uid"] = isLogged.uid;
        links["email"] = isLogged.email;
        links["userVoted"] = [];
        console.log("********************************************");
        console.log("********************************************");
        console.log("********************************************");
        console.log(links["uid"], links["email"], links["userVoted"])
        console.log("********************************************");
        console.log("********************************************");
        console.log("********************************************");
        console.log("********************************************");
        db.collection("users").doc(isLogged.uid).collection('links').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id);
                links["userVoted"].push(doc.id);
            });
            console.log(links["userVoted"]);
            res.json(links);
        });
    }
    else {
        links["uid"] = null;
        res.json(links);
    }
})

app.post('/login.html', (req, res) => {

    if (req.body.uid){
        isLogged = {
            email: req.body.email,
            uid: req.body.uid
        };
        console.log(isLogged);
        users.doc(isLogged.uid).set(isLogged).then(() => {
            users.doc(isLogged.uid).collection('links').doc(req.body.uid).set({link: 'null'});
        }).catch(() => {console.log('EROROROROROROROORRO');
        })
    }
    else {
        isLogged = {uid: null};
        console.log(isLogged);
    }

    // users.doc(req.body.email).set({
    //     id: req.body.email
    // })
    // .then(() => {
    //     users.doc(req.body.email).collection('links').add({
    //         link: "null"
    //     });
    //     console.log("SUCCESFULLT WRITTEN");
    // })
    // .catch(() => {console.log("ERRORROROKREOKROEKROOER");
    // });

    // db.collection("users").doc(req.body.email).collection('links').get().then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.data()['link'], " => ");
    //     });
    // });

})


exports.app = functions.https.onRequest(app);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
