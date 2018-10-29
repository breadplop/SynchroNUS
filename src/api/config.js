
// // Initialize Firebase
// import Firebase from 'firebase'

// var config = {
//     apiKey: "AIzaSyAcQY0MNvaO3jJ1Lj-NmssIdcwzOuelNB4",
//     authDomain: "orange-cake.firebaseapp.com",
//     databaseURL: "https://orange-cake.firebaseio.com",
//     projectId: "orange-cake",
//     storageBucket: "orange-cake.appspot.com",
//     messagingSenderId: "342044918777"
//   };

// let app = Firebase.initializeApp(config);
// let db = app.database();


// //firebase collections
// const dataRef = db.ref('charts/barData2')

// export {
//     dataRef,
//     db
// } 



////////////
// Initialize Firebase
import Firebase from 'firebase'

let config = {
apiKey: "AIzaSyB2Cgrn3DpMGo0GWzyvuCao8r0x3ldndx0",
authDomain: "bt3103-synchronus.firebaseapp.com",
databaseURL: "https://bt3103-synchronus.firebaseio.com",
projectId: "bt3103-synchronus",
storageBucket: "bt3103-synchronus.appspot.com",
messagingSenderId: "832030929818"
};

let app = Firebase.initializeApp(config);
let db = app.database();


//firebase collections
const dataRef = db.ref('charts/m1/nofilter/data');
//const dataRef = db.ref('charts/barData2')

export {
    dataRef,
    db
} 