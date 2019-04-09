// NodeJS and Express SERVER

// Firebase requires
const functions = require('firebase-functions');
const admin = require('firebase-admin');
let serviceAccount = require(__dirname + '/serviceAccountKey.json');

// Local links database
var links = require('./links.json');

// Express and BodyParser includes
const express = require('express');
const bodyParser = require('body-parser');

// declare express app as a variables
const app = express();


// use the public directory as static file file serving directory
app.use(express.static(__dirname + '/public'));


// VARIABLE TO STORE USER
let isLogged = {
    uid: null,
    email: null
};


// INTITALIZE FIREBASE APP AND DATABASE USING LOCAL KEY
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://pleasework-98e56.firebaseio.com'
});


// db -> variable to store database
const db = admin.firestore();
// get users table from database
const users = db.collection('users');


// Home Page - get user email if logged in
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


// Handles login, logout and register requests
app.post('/login.html', (req, res) => {
    if (req.body.uid){
        // user is logged in so store his info
        isLogged = {
            email: req.body.email,
            uid: req.body.uid
        };
        console.log(isLogged);
        // update data in database and set a fake link in links subcollection
        users.doc(isLogged.uid).set(isLogged).then(() => {
            users.doc(isLogged.uid).collection('links').doc(req.body.uid).set({link: 'null'});
            res.json(isLogged);
        }).catch(() => {console.log('Couldn;t add user');
        })
    }
    else {
        // No user logged in so info null
        isLogged = {
            uid: null,
            email: null
        };
        console.log(isLogged);
        res.json(isLogged);
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


// THE MAIN VOTE UPDATE ROUTE
app.post('/html/changeVotes', (req, res) => {

    if (req.body.remove){
        // If we need to downvote
        // remove the link from that users database
        users.doc(isLogged.uid).collection('links').doc(req.body.remove).delete().then(function() {
            console.log("Document successfully deleted!");
        })
        .catch(function(error) {
            console.error("Error writing deleting: ", error);
        });

        // decrement the score from local files database
        for(let link in links){
            for(let j = 0; j < links[link].length; j++){
                    if (links[link][j].key == req.body.remove){
                    links[link][j].score--;
                    // console.log(links.datalinks[i].links[j].score);
                }
            }
        }
    }
    else {
        // add link to user's database
        users.doc(isLogged.uid).collection('links').doc(req.body.add).set({
            link: req.body.add
        }).then(function() {
            // then increment score in local database
            for(let link in links){
                for(let j = 0; j < links[link].length; j++){
                        if (links[link][j].key == req.body.add){
                        links[link][j].score++;
                        // console.log(links.datalinks[i].links[j].score);
                    }
                }
            }
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
    res.send(isLogged.uid);
})



// ai page route
app.post('/html/ai.html', (req, res) => {
    // create a new response object named data
    data = {
        links: links['ai'],
    }
    if (isLogged['uid'] == null){
        // just return if not logged in
        data['uid'] = null;
        res.json(data);
    }
    else {
        // if logged in return upvoted links list
        data['uid'] = isLogged['uid'];
        data['email'] = isLogged['email'];
        data['voted'] = [];
        db.collection("users").doc(isLogged.uid).collection('links').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id);
                data["voted"].push(doc.id);
            });
        }).then(() => {
            console.log(data['voted']);
            res.json(data);
        })
    }
})

// algorithms page route
app.post('/html/algorithms.html', (req, res) => {
    // create a new response object named data
    data = {
        links: links['algorithms'],
    }
    if (isLogged['uid'] == null){
        // just return if not logged in
        data['uid'] = null;
        res.json(data);
    }
    else {
        // if logged in return upvoted links list
        data['uid'] = isLogged['uid'];
        data['email'] = isLogged['email'];
        data['voted'] = [];
        db.collection("users").doc(isLogged.uid).collection('links').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id);
                data["voted"].push(doc.id);
            });
        }).then(() => {
            console.log(data['voted']);
            res.json(data);
        })
    }
})

// appdev page route
app.post('/html/appdev.html', (req, res) => {
    // create a new response object named data
    data = {
        links: links['appdev'],
    }
    if (isLogged['uid'] == null){
        // just return if not logged in
        data['uid'] = null;
        res.json(data);
    }
    else {
        // if logged in return upvoted links list
        data['uid'] = isLogged['uid'];
        data['email'] = isLogged['email'];
        data['voted'] = [];
        db.collection("users").doc(isLogged.uid).collection('links').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id);
                data["voted"].push(doc.id);
            });
        }).then(() => {
            console.log(data['voted']);
            res.json(data);
        })
    }
})

// cloud computing page route
app.post('/html/cloudcomputing.html', (req, res) => {
    // create a new response object named data
    data = {
        links: links['cloudcomputing'],
    }
    if (isLogged['uid'] == null){
        // just return if not logged in
        data['uid'] = null;
        res.json(data);
    }
    else {
        // if logged in return upvoted links list
        data['uid'] = isLogged['uid'];
        data['email'] = isLogged['email'];
        data['voted'] = [];
        db.collection("users").doc(isLogged.uid).collection('links').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id);
                data["voted"].push(doc.id);
            });
        }).then(() => {
            console.log(data['voted']);
            res.json(data);
        })
    }
})

// database page route
app.post('/html/database.html', (req, res) => {
    // create a new response object named data
    data = {
        links: links['database'],
    }
    if (isLogged['uid'] == null){
        // just return if not logged in
        data['uid'] = null;
        res.json(data);
    }
    else {
        // if logged in return upvoted links list
        data['uid'] = isLogged['uid'];
        data['email'] = isLogged['email'];
        data['voted'] = [];
        db.collection("users").doc(isLogged.uid).collection('links').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id);
                data["voted"].push(doc.id);
            });
        }).then(() => {
            console.log(data['voted']);
            res.json(data);
        })
    }
})

// data structures page route
app.post('/html/datastructures.html', (req, res) => {
    // create a new response object named data
    data = {
        links: links['datastructures'],
    }
    if (isLogged['uid'] == null){
        // just return if not logged in
        data['uid'] = null;
        res.json(data);
    }
    else {
        // if logged in return upvoted links list
        data['uid'] = isLogged['uid'];
        data['email'] = isLogged['email'];
        data['voted'] = [];
        db.collection("users").doc(isLogged.uid).collection('links').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id);
                data["voted"].push(doc.id);
            });
        }).then(() => {
            console.log(data['voted']);
            res.json(data);
        })
    }
})

// networks page route
app.post('/html/networks.html', (req, res) => {
    // create a new response object named data
    data = {
        links: links['networks'],
    }
    if (isLogged['uid'] == null){
        // just return if not logged in
        data['uid'] = null;
        res.json(data);
    }
    else {
        // if logged in return upvoted links list
        data['uid'] = isLogged['uid'];
        data['email'] = isLogged['email'];
        data['voted'] = [];
        db.collection("users").doc(isLogged.uid).collection('links').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id);
                data["voted"].push(doc.id);
            });
        }).then(() => {
            console.log(data['voted']);
            res.json(data);
        })
    }
})

// operating systems page route
app.post('/html/operatingsystems.html', (req, res) => {
    // create a new response object named data
    data = {
        links: links['operatingsystems'],
    }
    if (isLogged['uid'] == null){
        // just return if not logged in
        data['uid'] = null;
        res.json(data);
    }
    else {
        // if logged in return upvoted links list
        data['uid'] = isLogged['uid'];
        data['email'] = isLogged['email'];
        data['voted'] = [];
        db.collection("users").doc(isLogged.uid).collection('links').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id);
                data["voted"].push(doc.id);
            });
        }).then(() => {
            console.log(data['voted']);
            res.json(data);
        })
    }
})

// webdev page route
app.post('/html/webdev.html', (req, res) => {
    // create a new response object named data
    data = {
        links: links['webdevelopment'],
    }
    if (isLogged['uid'] == null){
        // just return if not logged in
        data['uid'] = null;
        res.json(data);
    }
    else {
        // if logged in return upvoted links list
        data['uid'] = isLogged['uid'];
        data['email'] = isLogged['email'];
        data['voted'] = [];
        db.collection("users").doc(isLogged.uid).collection('links').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id);
                data["voted"].push(doc.id);
            });
        }).then(() => {
            console.log(data['voted']);
            res.json(data);
        })
    }
})


// RUN THE APP
exports.app = functions.https.onRequest(app);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
















































































































// app.post('/html/datastructurespost.html', (req, res) => {

//     if (req.body.remove){
//         users.doc(isLogged.uid).collection('links').doc(req.body.remove).delete().then(function() {
//             console.log("Document successfully deleted!");
//         })
//         .catch(function(error) {
//             console.error("Error writing deleting: ", error);
//         });



//         console.log();

//     }
//     else {

//     }

//     // db.collection("users").doc(isLogged.uid).collection('links').get().then(function(querySnapshot) {
//     //     querySnapshot.forEach(function(doc) {
//     //         // doc.data() is never undefined for query doc snapshots
//     //         console.log(doc.id, " => ");
//     //     });
//     // });
//     res.send('Pragun ROCKS!!');
// })

// app.post('/html/datastructures.html', (req, res) => {
//     if (isLogged.uid){
//         links["uid"] = isLogged.uid;
//         links["email"] = isLogged.email;
//         links["userVoted"] = [];
//         console.log("********************************************");
//         console.log("********************************************");
//         console.log("********************************************");
//         console.log(links["uid"], links["email"], links["userVoted"])
//         console.log("********************************************");
//         console.log("********************************************");
//         console.log("********************************************");
//         console.log("********************************************");
//         db.collection("users").doc(isLogged.uid).collection('links').get().then(function(querySnapshot) {
//             querySnapshot.forEach(function(doc) {
//                 // doc.data() is never undefined for query doc snapshots
//                 console.log(doc.id);
//                 links["userVoted"].push(doc.id);
//             });
//             console.log(links["userVoted"]);
//             res.json(links);
//         });
//     }
//     else {
//         links["uid"] = null;
//         res.json(links);
//     }
// })

