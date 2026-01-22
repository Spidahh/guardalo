// Firebase Configuration - Sostituisci con le tue credenziali
const firebaseConfig = {
    apiKey: "AIzaSyBQ9Fo1NiiDa3-c7Z2F3CCJbCZCxKzRjXo",
    authDomain: "guardalo-ea806.firebaseapp.com",
    projectId: "guardalo-ea806",
    storageBucket: "guardalo-ea806.firebasestorage.app",
    messagingSenderId: "682270952898",
    appId: "1:682270952898:web:4cdaa3dd994579a74fda5b",
    measurementId: "G-Y9X3Q6TV3M"
};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase inizializzato con successo");
} catch (error) {
    console.error("Errore Firebase:", error);
}

// Servizi Firebase
const auth = firebase.auth();
const db = firebase.firestore();

// Google Auth Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Export for use in other files
window.firebase = firebase;
window.auth = auth;
window.db = db;
window.googleProvider = googleProvider;
