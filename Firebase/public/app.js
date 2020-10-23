//to begin session
//terminal-->firebase emulators:start
//*On my computer, sometimes Firebase project will not update when I save it. fixes itself when I clear cache or restart localhost on incognito mode 



const auth= firebase.auth();

const whenSignedIn= document.getElementById('whenSignedIn');
const whenSignedOut=document.getElementById('whenSignedOut');

const signInBtn=document.getElementById('signInBtn');
const signOutBtn=document.getElementById('signOutBtn');

const userDetails=document.getElementById('userDetails');

const provider= new firebase.auth.GoogleAuthProvider();
signInBtn.onclick=()=> auth.signInWithPopup(provider);
signOutBtn.onclick=()=> auth.signOut();

//hides login message from screen if user is logged in
auth.onAuthStateChanged(user => {
    if (user) {
        // signed in
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        userDetails.innerHTML = `<h3>Hello ${user.displayName}! </h3> <h3>User ID: ${user.uid}</h3> <h3>If this table is unpopulated, your account is awaiting authentication.</h3>`;

    } else {
        // not signed in
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';

    }
}
);

///// Firestore /////

const db = firebase.firestore();

const createThing = document.getElementById('createThing');
const thingsList = document.getElementById('thingsList');


let thingsRef;
let unsubscribe;
let contentHolder;

//Behavior for add new student button
auth.onAuthStateChanged(user => {

    if (user) {

        // Database Reference
        thingsRef = db.collection('things')

        createThing.onclick = () => {
            thingsRef.add({
                uid: user.uid,
                name: "New Student",
                weight: 0,
                type: "New",
                count:0,
               // createdAt: serverTimestamp()
            });
        }

        // Query
        unsubscribe = thingsRef
           // .where('uid', '==', user.uid) //i think this makes it only show things the user has added
           // .orderBy('createdAt') // Requires a query
            .onSnapshot(querySnapshot => {
                
                // Map results to an array of li elements
                const items = querySnapshot.docs.map(doc => {
                    return `<li>Student: ${doc.data().name}, Weight: ${doc.data().weight}, Type: ${doc.data().type}</li>`
                });
                //console.log(items);
                thingsList.innerHTML = items.join('');
                
                //add this data to an array object that Picker.js will use
                const contents = querySnapshot.docs.map(doc => {
                    return doc.data()//.name
                });
                contentHolder = contents.slice();
                //console.log(classSize);
                //console.log(contentHolder);

               // console.log(querySnapshot.docs.values())

            })
         



    } else {
        // Unsubscribe when the user signs out
        unsubscribe && unsubscribe();
    }

   
});