import * as firebase from 'firebase';




const config = {
    apiKey: "AIzaSyB-OSrAjY7WrOi7Q_JemfqEzL73FjKtzBs",
    authDomain: "login-auth-react-a575b.firebaseapp.com",
    databaseURL: "https://login-auth-react-a575b.firebaseio.com",
    projectId: "login-auth-react-a575b",
    storageBucket: "login-auth-react-a575b.appspot.com",
    messagingSenderId: "183843600058"
};
firebase.initializeApp(config);

//firebase.firestore().settings(settings);

export default firebase;