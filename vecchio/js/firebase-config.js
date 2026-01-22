// ===================================
// GUARDALO - FIREBASE CONFIG
// ===================================

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
    window.auth = firebase.auth();
    window.db = firebase.firestore();
    window.googleProvider = new firebase.auth.GoogleAuthProvider();
    console.log("✅ Firebase initialized successfully");
} catch (e) {
    console.warn("⚠️ Firebase init failed:", e.message);
    window.auth = null;
    window.db = null;
}
