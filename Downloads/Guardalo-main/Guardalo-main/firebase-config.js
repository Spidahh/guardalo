// Firebase Configuration (Compat Mode)

const firebaseConfig = {
    apiKey: "AIzaSyBQ9Fo1NiiDa3-c7Z2F3CCJbCZCxKzRjXo",
    authDomain: "guardalo-ea806.firebaseapp.com",
    projectId: "guardalo-ea806",
    storageBucket: "guardalo-ea806.firebasestorage.app",
    messagingSenderId: "682270952898",
    appId: "1:682270952898:web:4cdaa3dd994579a74fda5b",
    measurementId: "G-Y9X3Q6TV3M"
};

// Initialize Firebase (Global Namespace)
firebase.initializeApp(firebaseConfig);

// Make available globally
window.auth = firebase.auth();
window.db = firebase.firestore();
window.googleProvider = new firebase.auth.GoogleAuthProvider();

console.log("Firebase Initialized (Compat Mode) - Globals Ready");
