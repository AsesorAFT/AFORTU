import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  User,
  signInWithEmailAndPassword,
  OAuthProvider,
  getAdditionalUserInfo,
  signInWithRedirect,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { z } from 'zod';

// Esquema para el formulario, se puede usar en el servicio y en el componente
export const signupSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
  email: z.string().email('Por favor, introduce un correo electrónico válido.'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres.'),
  isAfortuPro: z.boolean().default(false),
});

export type SignupFormValues = z.infer<typeof signupSchema>;

/**
 * Inicializa los datos del usuario en Firestore después del registro.
 * @param user - El objeto de usuario de Firebase Auth.
 * @param isPro - Booleano que indica si el usuario se registró como PRO.
 */
export async function initializeUserData(user: User, isPro: boolean) {
  if (!user || !db) return;

  const accountRef = doc(db, 'userSettings', user.uid);
  
  // Usar los datos de defaultSettings para asegurar consistencia
  const defaultStructure = {
      ownerId: user.uid,
      createdAt: serverTimestamp(),
      accountType: isPro ? 'PRO' : 'Standard',
      general: {
        brandName: 'AFORTU',
        rfc: '',
        baseCurrency: 'MXN',
        timezone: 'America/Mexico_City',
        logoDataUrl: 'https://firebasestorage.googleapis.com/v0/b/afortu.firebasestorage.app/o/LOGO%20DE%20AFORTU.PNG?alt=media&token=2e8530a1-30d3-4c0d-974e-46451594f7fb',
        emailRemitente: 'notificaciones@afortu.com.mx'
      },
      contracts: {
        enabled: true,
        requireSignature: true,
        defaultTemplate: 'Contrato de Adhesión General',
        folioPrefix: 'AFT-',
        nextFolio: 1,
      },
      cfdi: {
        enabled: false,
        version: '4.0',
        testMode: true,
        pacProvider: 'Finkok',
        emisorRfc: '',
        regimenFiscal: '',
        lugarExpedicion: '',
        serie: 'F',
        folioActual: 1,
        defaultUsoCfdi: 'G03',
        defaultFormaPago: '03',
        defaultMetodoPago: 'PUE'
      },
      advisor: {
        welcomeMessage: '¡Hola! Soy Asesor AFT. ¿En qué te puedo ayudar hoy?',
        systemPrompt: 'Eres Asesor AFT, un experto financiero. Sé amable y proactivo.',
        quickActions: [
            { label: 'Analizar portafolio', prompt: 'Analiza mi portafolio actual.' },
        ]
      },
      api: { enabled: false, rateLimit: 100 },
      portfolio: [],
      contractsData: [],
      invoicesData: [],
      deductiblePlansData: [],
      financialGoals: [],
      strategicObjectives: [],
      fixedRateContracts: [],
      contributionPlans: [],
  };

  await setDoc(accountRef, defaultStructure, { merge: true });
}

/**
 * Registra un nuevo usuario con email y contraseña.
 * @param values - Datos del formulario de registro.
 */
export async function signupWithEmail(values: SignupFormValues): Promise<User> {
  if (!auth) throw new Error('Firebase Auth no está inicializado.');
  
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    values.email,
    values.password
  );
  
  await updateProfile(userCredential.user, { displayName: values.name });

  await initializeUserData(userCredential.user, values.isAfortuPro);

  return userCredential.user;
}

// --- Phone Auth Functions ---

export function setupRecaptcha(containerId: string): RecaptchaVerifier {
    if (!auth) throw new Error("Firebase Auth not initialized.");
    // Asegúrate de que el contenedor esté vacío antes de renderizar
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = "";
    }
    return new RecaptchaVerifier(auth, containerId, {
      'size': 'invisible',
      'callback': (response: any) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log("reCAPTCHA solved");
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        console.log("reCAPTCHA expired");
      }
    });
}

export async function sendVerificationCode(phoneNumber: string, appVerifier: RecaptchaVerifier): Promise<ConfirmationResult> {
    if (!auth) throw new Error("Firebase Auth not initialized.");
    return await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
}

export async function confirmVerificationCode(confirmationResult: ConfirmationResult, code: string) {
    return await confirmationResult.confirm(code);
}

export const signInWithEmail = async (email: string, password: string) => {
  if (!auth) throw new Error("Firebase auth not configured");
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = async () => {
  if (!auth) throw new Error("Firebase auth not configured");
  const provider = new GoogleAuthProvider();
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  try {
    const result = isMobile 
        ? await signInWithRedirect(auth, provider).then(() => null) 
        : await signInWithPopup(auth, provider);

    // For mobile redirect, result will be null initially, auth state change will handle the rest.
    if (!result) return null;

    const additionalInfo = getAdditionalUserInfo(result);
    if (additionalInfo?.isNewUser) {
        await initializeUserData(result.user, false);
    }
    return result;

  } catch (error: any) {
    console.error("Google Sign-In Error", error);
    // Re-throw el error para que el componente que llama pueda manejarlo
    throw error;
  }
};

export const signInWithSalesforce = async () => {
    if (!auth) throw new Error("Firebase auth not configured");
    const provider = new OAuthProvider('salesforce.com');
    
    // De forma similar a Google, podríamos usar redirect para móviles.
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        await signInWithRedirect(auth, provider);
        return null;
    } else {
        return signInWithPopup(auth, provider);
    }
};
