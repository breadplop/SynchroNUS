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

//let db = firebase.firestore()
let app = Firebase.initializeApp(config);
let db = app.database();


//firebase collections
const dataRef2 = db.ref('teaching_review/t1/nofilter2');

export default dataRef2
// export {
//     db,
//     dataRef2
// }