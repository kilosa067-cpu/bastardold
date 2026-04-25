// ============================================
// FIREBASE CONFIGURATION - BASTARD BARBER
// ============================================

import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy, Timestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// ============================================
// CONFIGURACIÓN DE FIREBASE (OPCIONAL)
// ============================================
// Firebase solo se inicializa si hay credenciales válidas

const getFirebaseConfig = () => {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  
  // Si no hay credenciales, retornamos null (modo offline)
  if (!apiKey || apiKey === "YOUR_API_KEY" || !projectId || projectId === "YOUR_PROJECT_ID") {
    return null;
  }
  
  return {
    apiKey,
    authDomain: authDomain || `${projectId}.firebaseapp.com`,
    projectId,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || `${projectId}.appspot.com`,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  };
};

// Inicializar Firebase solo si hay credenciales válidas
let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;
let firebaseEnabled = false;

const firebaseConfig = getFirebaseConfig();
if (firebaseConfig && getApps().length === 0) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    firebaseEnabled = true;
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
  }
}

export { auth, db, storage, firebaseEnabled };

// ============================================
// AUTHENTICATION
// ============================================

export const loginAdmin = async (email: string, password: string): Promise<{ success: true; user: { email: string | null; uid: string; displayName: string | null } } | { success: false; error: string }> => {
  if (!auth || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado. Modo preview activo.' };
  }
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return { success: true, user: { email: user.email, uid: user.uid, displayName: user.displayName } };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const logoutAdmin = async () => {
  if (!auth || !firebaseEnabled) {
    return { success: true };
  }
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const onAuthChange = (callback: (user: { email: string | null; uid: string; displayName: string | null } | null) => void) => {
  if (!auth || !firebaseEnabled) {
    // En modo preview, simular que no hay usuario autenticado
    callback(null);
    return () => {}; // Retornar función de cleanup vacía
  }
  return onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      callback({ email: firebaseUser.email, uid: firebaseUser.uid, displayName: firebaseUser.displayName });
    } else {
      callback(null);
    }
  });
};

// ============================================
// FIRESTORE - CONFIGURACIÓN DEL SITIO
// ============================================

const CONFIG_DOC = 'site/config';

export const getSiteConfig = async () => {
  if (!db || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado' };
  }
  try {
    const docRef = doc(db, CONFIG_DOC);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    }
    return { success: false, error: 'Config not found' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const updateSiteConfig = async (config: any) => {
  if (!db || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado' };
  }
  try {
    const docRef = doc(db, CONFIG_DOC);
    await setDoc(docRef, { ...config, updatedAt: Timestamp.now() }, { merge: true });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ============================================
// FIRESTORE - BARBEROS
// ============================================

const BARBERS_COLLECTION = 'barbers';

export const getBarbers = async () => {
  if (!db || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado' };
  }
  try {
    const q = query(collection(db, BARBERS_COLLECTION), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    const barbers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: barbers };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const addBarber = async (barber: any) => {
  if (!db || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado' };
  }
  try {
    const docRef = await addDoc(collection(db, BARBERS_COLLECTION), {
      ...barber,
      createdAt: Timestamp.now()
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const updateBarber = async (id: string, barber: any) => {
  if (!db || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado' };
  }
  try {
    const docRef = doc(db, BARBERS_COLLECTION, id);
    await updateDoc(docRef, { ...barber, updatedAt: Timestamp.now() });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteBarber = async (id: string) => {
  if (!db || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado' };
  }
  try {
    await deleteDoc(doc(db, BARBERS_COLLECTION, id));
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ============================================
// FIRESTORE - SERVICIOS
// ============================================

const SERVICES_COLLECTION = 'services';

export const getServices = async () => {
  if (!db || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado' };
  }
  try {
    const q = query(collection(db, SERVICES_COLLECTION), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    const services = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: services };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const addService = async (service: any) => {
  if (!db || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado' };
  }
  try {
    const docRef = await addDoc(collection(db, SERVICES_COLLECTION), {
      ...service,
      createdAt: Timestamp.now()
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const updateService = async (id: string, service: any) => {
  if (!db || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado' };
  }
  try {
    const docRef = doc(db, SERVICES_COLLECTION, id);
    await updateDoc(docRef, { ...service, updatedAt: Timestamp.now() });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteService = async (id: string) => {
  if (!db || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado' };
  }
  try {
    await deleteDoc(doc(db, SERVICES_COLLECTION, id));
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ============================================
// FIRESTORE - SEMINARIOS
// ============================================

const SEMINARIOS_COLLECTION = 'seminarios';

export const getSeminarios = async () => {
  if (!db || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado' };
  }
  try {
    const q = query(collection(db, SEMINARIOS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const seminarios = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: seminarios };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const addSeminario = async (seminario: any) => {
  if (!db || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado' };
  }
  try {
    const docRef = await addDoc(collection(db, SEMINARIOS_COLLECTION), {
      ...seminario,
      createdAt: Timestamp.now()
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const updateSeminario = async (id: string, seminario: any) => {
  if (!db || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado' };
  }
  try {
    const docRef = doc(db, SEMINARIOS_COLLECTION, id);
    await updateDoc(docRef, { ...seminario, updatedAt: Timestamp.now() });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteSeminario = async (id: string) => {
  if (!db || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado' };
  }
  try {
    await deleteDoc(doc(db, SEMINARIOS_COLLECTION, id));
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ============================================
// FIRESTORE - CITAS
// ============================================

const APPOINTMENTS_COLLECTION = 'appointments';

export const getAppointments = async () => {
  if (!db || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado' };
  }
  try {
    const q = query(collection(db, APPOINTMENTS_COLLECTION), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    const appointments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: appointments };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const addAppointment = async (appointment: any) => {
  if (!db || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado' };
  }
  try {
    const docRef = await addDoc(collection(db, APPOINTMENTS_COLLECTION), {
      ...appointment,
      createdAt: Timestamp.now()
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const updateAppointment = async (id: string, appointment: any) => {
  if (!db || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado' };
  }
  try {
    const docRef = doc(db, APPOINTMENTS_COLLECTION, id);
    await updateDoc(docRef, { ...appointment, updatedAt: Timestamp.now() });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteAppointment = async (id: string) => {
  if (!db || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado' };
  }
  try {
    await deleteDoc(doc(db, APPOINTMENTS_COLLECTION, id));
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ============================================
// FIRESTORE - CAJA (TRANSACCIONES)
// ============================================

const TRANSACTIONS_COLLECTION = 'transactions';

export const getTransactions = async () => {
  if (!db || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado' };
  }
  try {
    const q = query(collection(db, TRANSACTIONS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const transactions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: transactions };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const addTransaction = async (transaction: any) => {
  if (!db || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado' };
  }
  try {
    const docRef = await addDoc(collection(db, TRANSACTIONS_COLLECTION), {
      ...transaction,
      createdAt: Timestamp.now()
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const updateTransaction = async (id: string, transaction: any) => {
  if (!db || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado' };
  }
  try {
    const docRef = doc(db, TRANSACTIONS_COLLECTION, id);
    await updateDoc(docRef, { ...transaction, updatedAt: Timestamp.now() });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteTransaction = async (id: string) => {
  if (!db || !firebaseEnabled) {
    return { success: false, error: 'Firebase no está configurado' };
  }
  try {
    await deleteDoc(doc(db, TRANSACTIONS_COLLECTION, id));
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ============================================
// STORAGE - SUBIR IMÁGENES
// ============================================

export const uploadImage = async (file: File, path: string): Promise<{ success: true; url: string } | { success: false; error: string }> => {
  if (!storage || !firebaseEnabled) {
    return { success: false, error: 'Firebase Storage no está configurado' };
  }
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return { success: true, url };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const uploadBarberImage = async (file: File, barberId: string) => {
  return uploadImage(file, `barbers/${barberId}/${file.name}`);
};

export const uploadServiceImage = async (file: File, serviceId: string) => {
  return uploadImage(file, `services/${serviceId}/${file.name}`);
};

export const uploadSeminarioImage = async (file: File, seminarioId: string) => {
  return uploadImage(file, `seminarios/${seminarioId}/${file.name}`);
};

export const uploadLogo = async (file: File) => {
  return uploadImage(file, `logo/${file.name}`);
};

// ============================================
// INICIALIZAR DATOS POR DEFECTO
// ============================================

export const initializeDefaultData = async () => {
  try {
    // Verificar si ya existe configuración
    const config = await getSiteConfig();
    if (!config.success) {
      // Crear configuración por defecto
      await updateSiteConfig({
        hero: {
          title: 'Barbería no es moda. Es ritual.',
          subtitle: 'Tradición clásica. Precisión moderna. Agenda digital sin fricción.',
          ctaPrimary: 'Agendar Cita',
          ctaSecondary: 'Conoce la Historia',
          backgroundImage: '/images/entrada.jpg',
        },
        historia: {
          title: 'La historia de Bastard',
          quote: '"SOMOS AMANTES DE LA CULTURA CLÁSICA, de la buena imagen y del vestir"',
          paragraphs: [
            'Es una marca personal dedicada a la preservación de los valores reales de la barbería tradicional y corte clásico (años 20\'s a finales de los 50\'s).',
            'Creada el 25 de Julio del 2014 en la ciudad de Oaxaca, México por Jahzeel Macias Salazar a.k.a. Bastard.',
            'Nace como una sátira o despectivo social a los grupos sociales de "etiqueta". Bastard es un ser y actitud única.',
          ],
          image: '/images/bastard.jpg',
          year: '2014',
          location: 'Oaxaca, México',
        },
        contact: {
          phone: '+52 951 123 4567',
          email: 'hola@bastardoldschool.com',
          address: 'Oaxaca de Juárez, Oaxaca, México',
          instagram: 'https://www.instagram.com/bastardoldschool/',
          whatsapp: 'https://wa.me/5219511234567',
          locationUrl: 'https://share.google/dV49v5RQN3UvxQhN6',
        },
        shopSchedule: {
          openTime: '09:00',
          closeTime: '20:00',
          daysOpen: [1, 2, 3, 4, 5, 6],
        },
      });
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export default app || {};
