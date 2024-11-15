// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore,collection, addDoc, getDocs, getCountFromServer, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3N-hv-DEQt01fvf8XbcSVWnYLc1za5Yc",
  authDomain: "teatro-nacional-pt2.firebaseapp.com",
  projectId: "teatro-nacional-pt2",
  storageBucket: "teatro-nacional-pt2.firebasestorage.app",
  messagingSenderId: "677021157314",
  appId: "1:677021157314:web:dc793c87f9d0c42344b85b"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db=getFirestore()
  
//Funciones
  export const saveProduct=(product)=>{
    addDoc(collection(db,'products'),product);
  }

  export const getProducts=()=>getDocs(collection(db,'products'))

  export const getProduct=(id)=>getDoc(doc(db,'products',id))

  export const getProductListSize=async()=>{
    const products = collection(db, "products");
    const snapshot = await getCountFromServer(products);
    return snapshot.data().count;
  }

export const deleteProduct=(id)=> deleteDoc(doc(db,'products',id))

export const updateProduct=(id, newFields)=>updateDoc(doc(db,'products',id), newFields)