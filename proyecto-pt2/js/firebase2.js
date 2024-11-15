import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, addDoc, setDoc, getDoc, getDocs, collection, query, where} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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
  export const auth= getAuth(app);
  const db=getFirestore(app);

    // Función para registrar usuarios
 export async function registerUser(email,password,firstName,lastName, fechaNac, telefono, cargo, departamento){
  try{
      const userCredencial=await createUserWithEmailAndPassword(auth,email,password);
      const user=userCredencial.user;
      await setDoc(doc(db,"users",user.uid),{
        firstName,
        lastName,
        fechaNac,
        telefono, 
        cargo, 
        departamento,
        email,
        role:"empleado"
      })
      console.log('Usuario registrado exitosamente: ', userCredencial.user);
      return true;
    }
  catch(error){
      console.log('Error:' , error.message);
      return false;
  }
}

export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Obtener datos del usuario desde Firestore
    const dataUser = await getDoc(doc(db, 'users', user.uid));

    if (dataUser.exists()) {
      const userData = dataUser.data();
      console.log("Inicio de sesión exitoso:", userData.role);
      return userData; // Retorna los datos, incluyendo el rol
    } else {
      throw new Error("El usuario no existe en la base de datos.");
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error.message);
    return null; // En caso de error
  }
}


// Función para obtener la lista de usuarios
export async function getUsers() {
  try {
    const usersCollection = collection(db, "users"); // Nombre de la colección
    const usersSnapshot = await getDocs(usersCollection);
    const users = usersSnapshot.docs.map(doc => ({
      id: doc.id, // ID único del documento
      ...doc.data() // Datos del usuario
    }));

    console.log("Usuarios obtenidos correctamente:", users);
    return users; // Devolver la lista de usuarios
  } catch (error) {
    console.error("Error al obtener los usuarios:", error.message);
    return [];
  }
}
