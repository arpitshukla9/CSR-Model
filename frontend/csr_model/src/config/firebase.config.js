import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAZW94oGiV8TvDlx6JR60VBSrStfhKIAsQ",
    authDomain: "theta-csrmodel.firebaseapp.com",
    projectId: "theta-csrmodel",
    storageBucket: "theta-csrmodel.firebasestorage.app",
    messagingSenderId: "247215849223",
    appId: "1:247215849223:web:c90925a8903f737cc44fa2",
    measurementId: "G-PKTW89K34C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
